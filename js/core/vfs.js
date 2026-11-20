import { INITIAL_FILESYSTEM } from './initial-fs.js';
import { events } from './events.js';

class VirtualFileSystem {
  constructor() {
    this.dbName = 'PhantomOS_VFS';
    this.storeName = 'files';
    this.dbVersion = 1;
    this.db = null;
    this.memoryFallback = new Map();
  }

  normalize(path) {
    if (!path || typeof path !== 'string') return '/';
    let clean = path.replace(/\\/g, '/').trim();
    if (!clean.startsWith('/')) clean = '/' + clean;

    const parts = clean.split('/').filter(p => p.length > 0 && p !== '.');
    const resolved = [];

    for (const part of parts) {
      if (part === '..') {
        if (resolved.length > 0) resolved.pop();
      } else {
        resolved.push(part);
      }
    }

    return '/' + resolved.join('/');
  }

  async init() {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        this.populateMemoryFallback();
        resolve(this);
        return;
      }

      const req = indexedDB.open(this.dbName, this.dbVersion);

      req.onupgradeneeded = (e) => {
        const database = e.target.result;
        if (!database.objectStoreNames.contains(this.storeName)) {
          database.createObjectStore(this.storeName, { keyPath: 'path' });
        }
      };

      req.onsuccess = async (e) => {
        this.db = e.target.result;
        const count = await this.countFiles();
        if (count === 0) {
          await this.populateInitialFiles();
        }
        resolve(this);
      };

      req.onerror = () => {
        this.populateMemoryFallback();
        resolve(this);
      };
    });
  }

  populateMemoryFallback() {
    INITIAL_FILESYSTEM.forEach(item => {
      this.memoryFallback.set(this.normalize(item.path), {
        path: this.normalize(item.path),
        content: item.content || '',
        isDirectory: Boolean(item.isDirectory),
        mtime: new Date().toISOString()
      });
    });
  }

  async countFiles() {
    if (!this.db) return this.memoryFallback.size;
    return new Promise((resolve) => {
      const tx = this.db.transaction([this.storeName], 'readonly');
      const store = tx.objectStore(this.storeName);
      const req = store.count();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(0);
    });
  }

  async populateInitialFiles() {
    for (const item of INITIAL_FILESYSTEM) {
      await this.writeFile(item.path, item.content || '', { isInitial: true, isDirectory: item.isDirectory });
    }
  }

  async reset() {
    if (this.db) {
      await new Promise((resolve) => {
        const tx = this.db.transaction([this.storeName], 'readwrite');
        const store = tx.objectStore(this.storeName);
        const req = store.clear();
        req.onsuccess = () => resolve();
        req.onerror = () => resolve();
      });
    }
    this.memoryFallback.clear();
    await this.populateInitialFiles();
    events.emit('vfs:reset');
  }

  async readFile(rawPath) {
    const path = this.normalize(rawPath);
    if (!this.db) {
      const record = this.memoryFallback.get(path);
      if (!record || record.isDirectory) {
        throw new Error(`File not found: ${path}`);
      }
      return record.content;
    }

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([this.storeName], 'readonly');
      const store = tx.objectStore(this.storeName);
      const req = store.get(path);

      req.onsuccess = () => {
        if (!req.result || req.result.isDirectory) {
          reject(new Error(`File not found: ${path}`));
        } else {
          resolve(req.result.content);
        }
      };

      req.onerror = () => reject(new Error(`Read error on ${path}`));
    });
  }

  async writeFile(rawPath, content, options = {}) {
    const path = this.normalize(rawPath);
    const isDirectory = Boolean(options.isDirectory);
    const record = {
      path,
      content: isDirectory ? '' : String(content),
      isDirectory,
      mtime: new Date().toISOString(),
      size: isDirectory ? 0 : new Blob([content]).size
    };

    if (!this.db) {
      this.memoryFallback.set(path, record);
    } else {
      await new Promise((resolve, reject) => {
        const tx = this.db.transaction([this.storeName], 'readwrite');
        const store = tx.objectStore(this.storeName);
        const req = store.put(record);
        req.onsuccess = () => resolve();
        req.onerror = (e) => reject(e);
      });
    }

    if (!options.isInitial) {
      events.emit('vfs:file-changed', { path, content, isDirectory });
    }
  }

  async exists(rawPath) {
    const path = this.normalize(rawPath);
    if (!this.db) {
      return this.memoryFallback.has(path);
    }
    return new Promise((resolve) => {
      const tx = this.db.transaction([this.storeName], 'readonly');
      const store = tx.objectStore(this.storeName);
      const req = store.get(path);
      req.onsuccess = () => resolve(Boolean(req.result));
      req.onerror = () => resolve(false);
    });
  }

  async readDir(rawDirPath) {
    const dirPath = this.normalize(rawDirPath);
    const prefix = dirPath === '/' ? '/' : dirPath + '/';
    const entriesMap = new Map();

    const processItem = (path, item) => {
      if (path === dirPath) return;
      if (path.startsWith(prefix)) {
        const rest = path.slice(prefix.length);
        const slashIdx = rest.indexOf('/');
        if (slashIdx === -1) {
          entriesMap.set(rest, {
            name: rest,
            path,
            isDirectory: item.isDirectory,
            size: item.size || 0,
            mtime: item.mtime
          });
        } else {
          const subDirName = rest.slice(0, slashIdx);
          if (!entriesMap.has(subDirName)) {
            entriesMap.set(subDirName, {
              name: subDirName,
              path: prefix + subDirName,
              isDirectory: true,
              size: 0,
              mtime: item.mtime
            });
          }
        }
      }
    };

    if (!this.db) {
      for (const [p, item] of this.memoryFallback) {
        processItem(p, item);
      }
      return Array.from(entriesMap.values()).sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name);
      });
    }

    return new Promise((resolve) => {
      const tx = this.db.transaction([this.storeName], 'readonly');
      const store = tx.objectStore(this.storeName);
      const req = store.getAll();

      req.onsuccess = () => {
        const allItems = req.result || [];
        for (const item of allItems) {
          processItem(item.path, item);
        }
        const result = Array.from(entriesMap.values()).sort((a, b) => {
          if (a.isDirectory && !b.isDirectory) return -1;
          if (!a.isDirectory && b.isDirectory) return 1;
          return a.name.localeCompare(b.name);
        });
        resolve(result);
      };

      req.onerror = () => resolve([]);
    });
  }

  async rename(rawOldPath, rawNewPath) {
    const oldPath = this.normalize(rawOldPath);
    const newPath = this.normalize(rawNewPath);
    if (oldPath === newPath) return;

    if (!this.db) {
      const keysToMove = [];
      for (const [p, val] of this.memoryFallback) {
        if (p === oldPath || p.startsWith(oldPath + '/')) {
          keysToMove.push({ p, val });
        }
      }
      for (const { p, val } of keysToMove) {
        this.memoryFallback.delete(p);
        const replaced = newPath + p.slice(oldPath.length);
        this.memoryFallback.set(replaced, { ...val, path: replaced });
      }
    } else {
      await new Promise((resolve, reject) => {
        const tx = this.db.transaction([this.storeName], 'readwrite');
        const store = tx.objectStore(this.storeName);
        const req = store.getAll();

        req.onsuccess = () => {
          const all = req.result || [];
          for (const item of all) {
            if (item.path === oldPath || item.path.startsWith(oldPath + '/')) {
              store.delete(item.path);
              const replaced = newPath + item.path.slice(oldPath.length);
              store.put({ ...item, path: replaced });
            }
          }
          resolve();
        };
        req.onerror = (e) => reject(e);
      });
    }

    events.emit('vfs:file-renamed', { oldPath, newPath });
  }

  async delete(rawPath) {
    const path = this.normalize(rawPath);
    if (!this.db) {
      const toDelete = [];
      for (const p of this.memoryFallback.keys()) {
        if (p === path || p.startsWith(path + '/')) {
          toDelete.push(p);
        }
      }
      toDelete.forEach(p => this.memoryFallback.delete(p));
    } else {
      await new Promise((resolve) => {
        const tx = this.db.transaction([this.storeName], 'readwrite');
        const store = tx.objectStore(this.storeName);
        const req = store.getAll();
        req.onsuccess = () => {
          const all = req.result || [];
          for (const item of all) {
            if (item.path === path || item.path.startsWith(path + '/')) {
              store.delete(item.path);
            }
          }
          resolve();
        };
        req.onerror = () => resolve();
      });
    }

    events.emit('vfs:file-deleted', { path });
  }
}

export const vfs = new VirtualFileSystem();
