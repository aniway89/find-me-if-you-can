/**
 * Find Me If You Can — File Explorer Application
 */
import { OSWindow } from '../wm/window.js';
import { vfs } from '../core/vfs.js';
import { audio } from '../core/audio.js';
import { events } from '../core/events.js';

export function openExplorer(initialPath = '/') {
  let currentPath = vfs.normalize(initialPath);
  let history = [currentPath];
  let historyIndex = 0;
  let selectedItem = null;

  const win = new OSWindow({
    title: `File Explorer — ${currentPath}`,
    iconSvg: `<svg viewBox="0 0 24 24" fill="#d29922"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`,
    width: 660,
    height: 440
  });

  const getFileIcon = (item) => {
    if (item.isDirectory) {
      return `<svg viewBox="0 0 24 24" fill="#d29922"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`;
    }
    if (item.name.endsWith('.lnk')) {
      return `<svg viewBox="0 0 24 24" fill="#388bfd"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`;
    }
    if (item.name.endsWith('.json') || item.name.endsWith('.xml') || item.name.endsWith('.env') || item.name.endsWith('.conf') || item.name.endsWith('.cfg')) {
      return `<svg viewBox="0 0 24 24" fill="#bc8cff"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`;
    }
    if (item.name.endsWith('.py') || item.name.endsWith('.js')) {
      return `<svg viewBox="0 0 24 24" fill="#3fb950"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>`;
    }
    return `<svg viewBox="0 0 24 24" fill="#8b949e"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/></svg>`;
  };

  win.setContent(`
    <div class="explorer-container">
      <div class="explorer-nav-bar">
        <button class="toolbar-btn btn-back" title="Back" disabled>
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button class="toolbar-btn btn-fwd" title="Forward" disabled>
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
        <button class="toolbar-btn btn-up" title="Up Directory">
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>
        </button>
        <input type="text" class="explorer-path-input" value="${currentPath}">
        <button class="toolbar-btn btn-refresh" title="Refresh">
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
        </button>
      </div>
      <div class="app-toolbar">
        <button class="toolbar-btn btn-open-editor">Open in Editor</button>
        <button class="toolbar-btn btn-rename-item">Rename</button>
        <button class="toolbar-btn btn-delete-item">Delete</button>
        <div class="toolbar-separator"></div>
        <button class="toolbar-btn btn-new-folder">+ New Folder</button>
      </div>
      <div class="explorer-body">
        <div class="explorer-sidebar">
          <div class="explorer-tree-item" data-path="/"><span>📁 Root (/)</span></div>
          <div class="explorer-tree-item" data-path="/home/desktop"><span>🖥️ Desktop</span></div>
          <div class="explorer-tree-item" data-path="/sys"><span>⚙️ System (/sys)</span></div>
          <div class="explorer-tree-item" data-path="/etc"><span>📝 Config (/etc)</span></div>
          <div class="explorer-tree-item" data-path="/scripts"><span>📜 Scripts</span></div>
          <div class="explorer-tree-item" data-path="/.archive"><span>🔒 Archive (Hidden)</span></div>
        </div>
        <div class="explorer-file-list"></div>
      </div>
      <div class="explorer-status-bar">
        <span class="status-count">0 items</span>
        <span class="status-selected">No selection</span>
      </div>
    </div>
  `);

  const pathInput = win.contentElement.querySelector('.explorer-path-input');
  const fileList = win.contentElement.querySelector('.explorer-file-list');
  const btnBack = win.contentElement.querySelector('.btn-back');
  const btnFwd = win.contentElement.querySelector('.btn-fwd');
  const btnUp = win.contentElement.querySelector('.btn-up');
  const btnRefresh = win.contentElement.querySelector('.btn-refresh');
  const statusCount = win.contentElement.querySelector('.status-count');
  const statusSelected = win.contentElement.querySelector('.status-selected');
  const sidebarItems = win.contentElement.querySelectorAll('.explorer-tree-item');

  const renderFolder = async (dirPath) => {
    currentPath = vfs.normalize(dirPath);
    pathInput.value = currentPath;
    win.setTitle(`File Explorer — ${currentPath}`);

    // Secret 09: Exploring hidden vault or archive
    if (currentPath === '/.archive' || currentPath === '/sys/.vault') {
      events.emit('secret:trigger-attempt', { id: 'secret_09', source: 'explorer_navigation' });
    }

    // Update sidebar active class
    sidebarItems.forEach(item => {
      if (item.dataset.path === currentPath) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    btnBack.disabled = historyIndex <= 0;
    btnFwd.disabled = historyIndex >= history.length - 1;

    try {
      const items = await vfs.readDir(currentPath);
      fileList.innerHTML = '';
      selectedItem = null;
      statusCount.textContent = `${items.length} item${items.length === 1 ? '' : 's'}`;
      statusSelected.textContent = 'No selection';

      if (items.length === 0) {
        fileList.innerHTML = '<div style="grid-column: 1/-1; padding: 24px; text-align: center; color: var(--text-muted);">This folder is empty.</div>';
        return;
      }

      items.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'explorer-item';
        itemEl.dataset.path = item.path;
        itemEl.dataset.isDir = String(item.isDirectory);
        itemEl.innerHTML = `
          <div class="explorer-item-icon">${getFileIcon(item)}</div>
          <span class="explorer-item-name" title="${item.name}">${item.name}</span>
        `;

        itemEl.addEventListener('click', (e) => {
          e.stopPropagation();
          fileList.querySelectorAll('.explorer-item').forEach(el => el.classList.remove('selected'));
          itemEl.classList.add('selected');
          selectedItem = item;
          statusSelected.textContent = `${item.name} ${item.isDirectory ? '(Directory)' : `(${item.size} bytes)`}`;
        });

        itemEl.addEventListener('dblclick', () => {
          audio.playClick();
          if (item.isDirectory) {
            navigate(item.path);
          } else {
            events.emit('app:open-editor', item.path);
          }
        });

        fileList.appendChild(itemEl);
      });
    } catch (err) {
      fileList.innerHTML = `<div style="grid-column: 1/-1; padding: 20px; color: var(--status-danger);">Cannot open directory: ${err.message}</div>`;
    }
  };

  const navigate = (newPath) => {
    const target = vfs.normalize(newPath);
    if (target === currentPath) return;
    history = history.slice(0, historyIndex + 1);
    history.push(target);
    historyIndex = history.length - 1;
    renderFolder(target);
  };

  btnBack.addEventListener('click', () => {
    if (historyIndex > 0) {
      historyIndex -= 1;
      renderFolder(history[historyIndex]);
    }
  });

  btnFwd.addEventListener('click', () => {
    if (historyIndex < history.length - 1) {
      historyIndex += 1;
      renderFolder(history[historyIndex]);
    }
  });

  btnUp.addEventListener('click', () => {
    if (currentPath === '/') return;
    const parent = currentPath.substring(0, currentPath.lastIndexOf('/')) || '/';
    navigate(parent);
  });

  btnRefresh.addEventListener('click', () => {
    audio.playClick();
    renderFolder(currentPath);
  });

  pathInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      navigate(pathInput.value);
    }
  });

  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      audio.playClick();
      navigate(item.dataset.path);
    });
  });

  // Action buttons
  win.contentElement.querySelector('.btn-open-editor').addEventListener('click', () => {
    if (selectedItem && !selectedItem.isDirectory) {
      events.emit('app:open-editor', selectedItem.path);
    } else {
      events.emit('system:show-toast', { title: 'File Explorer', desc: 'Select a file to open in Code Editor.', type: 'info' });
    }
  });

  win.contentElement.querySelector('.btn-rename-item').addEventListener('click', async () => {
    if (!selectedItem) {
      events.emit('system:show-toast', { title: 'File Explorer', desc: 'Select an item to rename.', type: 'warning' });
      return;
    }
    const newName = prompt(`Rename "${selectedItem.name}" to:`, selectedItem.name);
    if (newName && newName !== selectedItem.name) {
      const parentDir = currentPath === '/' ? '/' : currentPath + '/';
      const targetPath = vfs.normalize(parentDir + newName);
      await vfs.rename(selectedItem.path, targetPath);
      renderFolder(currentPath);
    }
  });

  win.contentElement.querySelector('.btn-delete-item').addEventListener('click', async () => {
    if (!selectedItem) return;
    if (confirm(`Are you sure you want to delete ${selectedItem.name}?`)) {
      await vfs.delete(selectedItem.path);
      renderFolder(currentPath);
    }
  });

  win.contentElement.querySelector('.btn-new-folder').addEventListener('click', async () => {
    const folderName = prompt('Enter new folder name:');
    if (folderName) {
      const parentDir = currentPath === '/' ? '/' : currentPath + '/';
      await vfs.writeFile(parentDir + folderName, '', { isDirectory: true });
      renderFolder(currentPath);
    }
  });

  renderFolder(currentPath);
  return win;
}
