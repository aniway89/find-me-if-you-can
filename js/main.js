import { vfs } from './core/vfs.js';
import { state } from './core/state.js';
import { events } from './core/events.js';
import { audio } from './core/audio.js';
import { wm } from './wm/window-manager.js';
import { discoveryEngine } from './engine/discovery-engine.js';
import { 
  initFirebase, 
  validateUsernameFormat, 
  checkUsernameAvailable, 
  registerPlayer, 
  fetchCurrentPlayerProfile,
  isFirebaseConfigured 
} from './core/firebase-service.js';

import { openExplorer } from './apps/explorer.js';
import { openTerminal } from './apps/terminal.js';
import { openEditor } from './apps/editor.js';
import { openBrowser } from './apps/browser.js';
import { openBlog } from './apps/blog.js';
import { openMail } from './apps/mail.js';
import { openSettings } from './apps/settings.js';
import { openDeviceManager } from './apps/devices.js';
import { openMonitor } from './apps/monitor.js';
import { openAbout } from './apps/about.js';
import { openJournal } from './apps/journal.js';
import { openLeaderboard } from './apps/leaderboard.js';

const APPLICATIONS = [
  {
    id: 'journal',
    name: 'Discovery Journal',
    desc: 'Engineering progress and secrets',
    icon: `<svg viewBox="0 0 24 24" fill="#bc8cff"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-2h2v2zm0-4H7v-2h2v2zm0-4H7V7h2v2zm8 8h-6v-2h6v2zm0-4h-6v-2h6v2zm0-4h-6V7h6v2z"/></svg>`,
    launch: () => openJournal()
  },
  {
    id: 'leaderboard',
    name: 'Global Leaderboard',
    desc: 'Live global player rankings',
    icon: `<svg viewBox="0 0 24 24" fill="#388bfd"><path d="M16 11V3H8v6H2v12h20V11h-6zm-6-6h4v14h-4V5zm-6 8h4v6H4v-6zm16 6h-4v-8h4v8z"/></svg>`,
    launch: () => openLeaderboard()
  },
  {
    id: 'explorer',
    name: 'File Explorer',
    desc: 'Virtual storage manager',
    icon: `<svg viewBox="0 0 24 24" fill="#d29922"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`,
    launch: (path) => openExplorer(path || '/')
  },
  {
    id: 'terminal',
    name: 'Terminal',
    desc: 'Interactive command shell',
    icon: `<svg viewBox="0 0 24 24" fill="#3fb950"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-2-1h-6v-2h6v2zM7.5 17l-1.4-1.4 3.6-3.6-3.6-3.6L7.5 7l5 5-5 5z"/></svg>`,
    launch: () => openTerminal()
  },
  {
    id: 'editor',
    name: 'Code Editor',
    desc: 'Virtual file editor',
    icon: `<svg viewBox="0 0 24 24" fill="#58a6ff"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>`,
    launch: (path) => openEditor(path || '/readme.txt')
  },
  {
    id: 'browser',
    name: 'Web Browser',
    desc: 'Internal documentation viewer',
    icon: `<svg viewBox="0 0 24 24" fill="#388bfd"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,
    launch: (url) => openBrowser(url || 'http://intranet.local')
  },
  {
    id: 'blog',
    name: 'Kernel Blog',
    desc: 'Engineering dispatches and history',
    icon: `<svg viewBox="0 0 24 24" fill="#bc8cff"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`,
    launch: () => openBlog()
  },
  {
    id: 'mail',
    name: 'Phantom Mail',
    desc: 'Local communication archive',
    icon: `<svg viewBox="0 0 24 24" fill="#58a6ff"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    launch: () => openMail()
  },
  {
    id: 'monitor',
    name: 'System Monitor',
    desc: 'Processes and telemetry logs',
    icon: `<svg viewBox="0 0 24 24" fill="#3fb950"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>`,
    launch: () => openMonitor()
  },
  {
    id: 'devices',
    name: 'Device Manager',
    desc: 'Hardware device tree',
    icon: `<svg viewBox="0 0 24 24" fill="#388bfd"><path d="M4 6h16v10H4V6zm18 12H2v2h20v-2zM6 8v6h12V8H6z"/></svg>`,
    launch: () => openDeviceManager()
  },
  {
    id: 'settings',
    name: 'Settings',
    desc: 'Preferences and developer switches',
    icon: `<svg viewBox="0 0 24 24" fill="#8b949e"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`,
    launch: () => openSettings()
  },
  {
    id: 'about',
    name: 'About PhantomOS',
    desc: 'System identity',
    icon: `<svg viewBox="0 0 24 24" fill="#388bfd"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="2"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" stroke-width="2"/></svg>`,
    launch: () => openAbout()
  }
];

class OSBootstrapper {
  async init() {
    await vfs.init();
    wm.init();
    discoveryEngine.init();

    this.renderDesktopShortcuts();
    this.renderStartMenu();
    this.setupGlobalEvents();

    await this.handleOnboarding();
  }

  async handleOnboarding() {
    const welcomeModal = document.getElementById('welcome-modal');
    const welcomeForm = document.getElementById('welcome-form');
    const welcomeInput = document.getElementById('welcome-username');
    const validationMsg = document.getElementById('welcome-validation-msg');
    const startBtn = document.getElementById('welcome-start-btn');
    const configStatusPill = document.getElementById('welcome-config-status');

    if (configStatusPill) {
      if (isFirebaseConfigured()) {
        configStatusPill.textContent = 'Firestore Connected';
        configStatusPill.className = 'welcome-status-pill pill-online';
      } else {
        configStatusPill.textContent = 'Local Standby';
        configStatusPill.className = 'welcome-status-pill pill-local';
      }
    }

    // Initialize Auth in background
    await initFirebase();

    // Check if returning user
    const savedName = localStorage.getItem('phantom_username');
    let existingProfile = null;

    if (savedName) {
      existingProfile = await fetchCurrentPlayerProfile();
    }

    if (existingProfile && existingProfile.username) {
      state.setUsername(existingProfile.username);
      this.updateUserUI();
      if (welcomeModal) welcomeModal.style.display = 'none';
      return;
    }

    // New player: show onboarding modal
    if (welcomeModal) {
      welcomeModal.style.display = 'flex';
      if (welcomeInput) welcomeInput.focus();
    }

    let checkTimer = null;

    const setValidation = (text, type = '') => {
      if (!validationMsg) return;
      validationMsg.textContent = text;
      validationMsg.className = `validation-message ${type}`;
    };

    if (welcomeInput) {
      welcomeInput.addEventListener('input', () => {
        clearTimeout(checkTimer);
        const raw = welcomeInput.value.trim();

        if (!raw) {
          setValidation('');
          return;
        }

        const format = validateUsernameFormat(raw);
        if (!format.valid) {
          setValidation(format.error, 'error');
          return;
        }

        setValidation('Checking availability...', 'checking');

        checkTimer = setTimeout(async () => {
          const res = await checkUsernameAvailable(raw);
          if (res.available) {
            setValidation('Username is available.', 'success');
          } else {
            setValidation(res.error || 'Username already taken.', 'error');
          }
        }, 400);
      });
    }

    if (welcomeForm) {
      welcomeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const raw = welcomeInput ? welcomeInput.value.trim() : '';

        const format = validateUsernameFormat(raw);
        if (!format.valid) {
          setValidation(format.error, 'error');
          return;
        }

        setValidation('Registering player identity...', 'checking');
        if (startBtn) startBtn.disabled = true;

        try {
          const profile = await registerPlayer(format.clean, state.points, state.discoveredSecrets);
          state.setUsername(profile.username);
          this.updateUserUI();
          audio.playClick();

          if (welcomeModal) welcomeModal.style.display = 'none';
          events.emit('system:show-toast', {
            title: 'Identity Registered',
            desc: `Welcome, ${profile.username}. Workstation initialized.`,
            type: 'success'
          });
        } catch (err) {
          setValidation(err.message || 'Registration failed. Please try again.', 'error');
          if (startBtn) startBtn.disabled = false;
        }
      });
    }
  }

  renderDesktopShortcuts() {
    const desktopContainer = document.getElementById('desktop-icons');
    if (!desktopContainer) return;
    desktopContainer.innerHTML = '';

    APPLICATIONS.forEach(app => {
      const icon = document.createElement('div');
      icon.className = 'desktop-icon';
      icon.dataset.appId = app.id;
      icon.innerHTML = `
        <div class="desktop-icon-img">${app.icon}</div>
        <div class="desktop-icon-label">${app.name}</div>
      `;

      icon.addEventListener('click', (e) => {
        e.stopPropagation();
        desktopContainer.querySelectorAll('.desktop-icon').forEach(el => el.classList.remove('selected'));
        icon.classList.add('selected');
      });

      icon.addEventListener('dblclick', () => {
        audio.playClick();
        const winInstance = app.launch();
        if (winInstance) wm.createWindow(winInstance);
      });

      desktopContainer.appendChild(icon);
    });

    const orionShortcut = document.createElement('div');
    orionShortcut.className = 'desktop-icon';
    orionShortcut.dataset.appId = 'broken_orion';
    orionShortcut.innerHTML = `
      <div class="desktop-icon-img">
        <svg viewBox="0 0 24 24" fill="#f85149">
          <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2zm0-6h2v4h-2z"/>
        </svg>
      </div>
      <div class="desktop-icon-label">Project Orion</div>
    `;

    orionShortcut.addEventListener('click', (e) => {
      e.stopPropagation();
      desktopContainer.querySelectorAll('.desktop-icon').forEach(el => el.classList.remove('selected'));
      orionShortcut.classList.add('selected');
    });

    orionShortcut.addEventListener('dblclick', async () => {
      audio.playClick();
      try {
        const lnk = await vfs.readFile('/home/desktop/Project_Orion.lnk');
        if (lnk.includes('/sys/orion_core.sys') && !lnk.includes('orion_corrupt.bin')) {
          events.emit('system:show-toast', {
            title: 'Project Orion',
            desc: 'Target valid. Linked to /sys/orion_core.sys.',
            type: 'success'
          });
          discoveryEngine.unlockSecret('secret_10');
        } else {
          events.emit('system:show-toast', {
            title: 'Broken Shortcut',
            desc: 'Target /opt/orion_corrupt.bin is invalid. Edit /home/desktop/Project_Orion.lnk to fix.',
            type: 'warning'
          });
          const winInstance = openEditor('/home/desktop/Project_Orion.lnk');
          if (winInstance) wm.createWindow(winInstance);
        }
      } catch (err) {
        events.emit('system:show-toast', { title: 'Shortcut Error', desc: err.message, type: 'warning' });
      }
    });

    desktopContainer.appendChild(orionShortcut);
  }

  renderStartMenu() {
    const list = document.getElementById('start-apps-list');
    const searchInput = document.getElementById('start-search-input');
    if (!list) return;

    const populate = (filter = '') => {
      list.innerHTML = '';
      const filtered = APPLICATIONS.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()) || a.desc.toLowerCase().includes(filter.toLowerCase()));

      filtered.forEach(app => {
        const item = document.createElement('div');
        item.className = 'start-app-item';
        item.innerHTML = `
          <div class="start-app-icon">${app.icon}</div>
          <div class="start-app-meta">
            <span class="start-app-name">${app.name}</span>
            <span class="start-app-desc">${app.desc}</span>
          </div>
        `;

        item.addEventListener('click', () => {
          audio.playClick();
          wm.toggleStartMenu(false);
          const winInstance = app.launch();
          if (winInstance) wm.createWindow(winInstance);
        });

        list.appendChild(item);
      });
    };

    populate();

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        populate(searchInput.value);
      });
    }

    const btnJournal = document.getElementById('btn-start-journal');
    if (btnJournal) {
      btnJournal.addEventListener('click', () => {
        wm.toggleStartMenu(false);
        const win = openJournal();
        if (win) wm.createWindow(win);
      });
    }

    const btnLb = document.getElementById('btn-start-leaderboard');
    if (btnLb) {
      btnLb.addEventListener('click', () => {
        wm.toggleStartMenu(false);
        const win = openLeaderboard();
        if (win) wm.createWindow(win);
      });
    }

    const btnSettings = document.getElementById('btn-start-settings');
    if (btnSettings) {
      btnSettings.addEventListener('click', () => {
        wm.toggleStartMenu(false);
        const win = openSettings();
        if (win) wm.createWindow(win);
      });
    }
  }

  updateUserUI() {
    const usernameEl = document.getElementById('start-username');
    const rankEl = document.getElementById('start-rank');
    const avatarEl = document.getElementById('start-avatar');

    const name = state.username || 'Developer';
    if (usernameEl) usernameEl.textContent = name;
    if (rankEl) rankEl.textContent = state.rank;
    if (avatarEl) avatarEl.textContent = name.charAt(0).toUpperCase();
  }

  setupGlobalEvents() {
    events.on('user:profile-changed', () => this.updateUserUI());
    events.on('user:rank-changed', () => this.updateUserUI());

    events.on('desktop:context-action', (action) => {
      switch (action) {
        case 'new-terminal': {
          const win = openTerminal();
          if (win) wm.createWindow(win);
          break;
        }
        case 'open-explorer': {
          const win = openExplorer('/');
          if (win) wm.createWindow(win);
          break;
        }
        case 'open-leaderboard': {
          const win = openLeaderboard();
          if (win) wm.createWindow(win);
          break;
        }
        case 'open-settings': {
          const win = openSettings();
          if (win) wm.createWindow(win);
          break;
        }
        case 'refresh-desktop':
          this.renderDesktopShortcuts();
          break;
      }
    });

    events.on('app:open-editor', (filePath) => {
      const win = openEditor(filePath);
      if (win) wm.createWindow(win);
    });

    events.on('app:open-explorer', (dirPath) => {
      const win = openExplorer(dirPath);
      if (win) wm.createWindow(win);
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new OSBootstrapper().init());
} else {
  new OSBootstrapper().init();
}
