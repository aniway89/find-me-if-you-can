import { events } from '../core/events.js';
import { audio } from '../core/audio.js';
import { state } from '../core/state.js';

class WindowManager {
  constructor() {
    this.windows = new Map();
    this.activeWindow = null;
    this.currentZIndex = 100;
    this.container = null;
    this.taskbarApps = null;
    this.startMenu = null;
    this.startButton = null;
    this.clockFlyout = null;
    this.contextMenu = null;

    this.logoClickCount = 0;
    this.logoClickTimer = null;
  }

  init() {
    this.container = document.getElementById('windows-container');
    this.taskbarApps = document.getElementById('taskbar-apps');
    this.startMenu = document.getElementById('start-menu');
    this.startButton = document.getElementById('start-button');
    this.clockFlyout = document.getElementById('clock-flyout');
    this.contextMenu = document.getElementById('desktop-context-menu');

    this.setupTaskbarControls();
    this.setupClock();
    this.setupContextMenu();
    this.setupDesktopSelection();
    this.setupGlobalClickDismissal();

    events.on('wm:window-focused', (win) => this.handleWindowFocus(win));
    events.on('wm:window-minimized', (win) => this.handleWindowMinimize(win));
    events.on('wm:window-restored', (win) => this.handleWindowRestore(win));
    events.on('wm:window-closed', (win) => this.handleWindowClose(win));
    events.on('wm:window-title-changed', (win) => this.updateTaskbarTitle(win));
  }

  createWindow(win) {
    if (!win || !win.element) return null;
    audio.playOpen();

    this.windows.set(win.id, win);
    this.container.appendChild(win.element);
    this.createTaskbarTab(win);
    this.bringToFront(win);
    return win;
  }

  bringToFront(win) {
    if (!win || !win.element) return;
    this.currentZIndex += 1;
    win.element.style.zIndex = this.currentZIndex;

    this.windows.forEach(w => {
      if (w.id !== win.id) w.setInactive();
    });

    win.isFocused = true;
    win.element.classList.remove('inactive');
    this.activeWindow = win;
    state.activeWindowId = win.id;

    this.updateTaskbarActiveState();
  }

  handleWindowFocus(win) {
    this.bringToFront(win);
  }

  handleWindowMinimize(win) {
    if (this.activeWindow && this.activeWindow.id === win.id) {
      this.activeWindow = null;
      let topWin = null;
      let highestZ = -1;
      this.windows.forEach(w => {
        if (!w.isMinimized && w.element) {
          const z = parseInt(w.element.style.zIndex || '0', 10);
          if (z > highestZ) {
            highestZ = z;
            topWin = w;
          }
        }
      });
      if (topWin) topWin.focus();
    }
    this.updateTaskbarActiveState();
  }

  handleWindowRestore(win) {
    this.bringToFront(win);
  }

  handleWindowClose(win) {
    this.windows.delete(win.id);
    const tab = document.getElementById(`taskbar-tab-${win.id}`);
    if (tab && tab.parentNode) tab.parentNode.removeChild(tab);

    if (this.activeWindow && this.activeWindow.id === win.id) {
      this.activeWindow = null;
      let topWin = null;
      let highestZ = -1;
      this.windows.forEach(w => {
        if (!w.isMinimized && w.element) {
          const z = parseInt(w.element.style.zIndex || '0', 10);
          if (z > highestZ) {
            highestZ = z;
            topWin = w;
          }
        }
      });
      if (topWin) topWin.focus();
    }
  }

  createTaskbarTab(win) {
    const tab = document.createElement('div');
    tab.className = 'taskbar-item active';
    tab.id = `taskbar-tab-${win.id}`;
    tab.innerHTML = `
      <div class="taskbar-item-icon">${win.iconSvg}</div>
      <span class="taskbar-item-title">${win.title}</span>
    `;

    tab.addEventListener('click', () => {
      audio.playClick();
      if (win.isMinimized) {
        win.restore();
      } else if (this.activeWindow && this.activeWindow.id === win.id) {
        win.minimize();
      } else {
        win.focus();
      }
    });

    this.taskbarApps.appendChild(tab);
  }

  updateTaskbarActiveState() {
    this.windows.forEach(win => {
      const tab = document.getElementById(`taskbar-tab-${win.id}`);
      if (tab) {
        if (this.activeWindow && this.activeWindow.id === win.id && !win.isMinimized) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      }
    });
  }

  updateTaskbarTitle(win) {
    const tab = document.getElementById(`taskbar-tab-${win.id}`);
    if (tab) {
      const titleSpan = tab.querySelector('.taskbar-item-title');
      if (titleSpan) titleSpan.textContent = win.title;
    }
  }

  setupTaskbarControls() {
    this.startButton.addEventListener('click', (e) => {
      e.stopPropagation();
      audio.playClick();
      this.toggleStartMenu();

      this.logoClickCount += 1;
      clearTimeout(this.logoClickTimer);
      if (this.logoClickCount >= 5) {
        this.logoClickCount = 0;
        events.emit('secret:trigger-attempt', { id: 'secret_01', source: 'start_button_multiclick' });
      } else {
        this.logoClickTimer = setTimeout(() => {
          this.logoClickCount = 0;
        }, 1200);
      }
    });

    const audioBtn = document.getElementById('tray-audio');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const enabled = audio.toggle();
        audioBtn.style.opacity = enabled ? '1' : '0.4';
        if (enabled) audio.playClick();
      });
    }

    const netBtn = document.getElementById('tray-network');
    if (netBtn) {
      netBtn.addEventListener('click', () => {
        audio.playClick();
        events.emit('system:show-toast', {
          title: 'Network Gateway',
          desc: 'Connected (127.0.0.1:8080). Gateway latency: 0.1ms',
          type: 'info'
        });
      });
    }
  }

  toggleStartMenu(forceState) {
    const isOpen = this.startMenu.classList.contains('open');
    const newState = forceState !== undefined ? forceState : !isOpen;

    if (newState) {
      this.startMenu.classList.add('open');
      this.startButton.classList.add('active');
      const search = document.getElementById('start-search-input');
      if (search) search.focus();
    } else {
      this.startMenu.classList.remove('open');
      this.startButton.classList.remove('active');
    }
    this.clockFlyout.classList.remove('open');
  }

  setupClock() {
    const trayClock = document.getElementById('tray-clock');
    const trayTime = document.getElementById('tray-time');
    const trayDate = document.getElementById('tray-date');
    const flyoutTime = document.getElementById('flyout-time');
    const flyoutDate = document.getElementById('flyout-date');
    const clockSyncBtn = document.getElementById('clock-sync-trigger');

    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;

      const timeStr = `${hours}:${minutes} ${ampm}`;
      const fullTimeStr = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
      const dateStr = now.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' });
      const fullDateStr = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

      if (trayTime) trayTime.textContent = timeStr;
      if (trayDate) trayDate.textContent = dateStr;
      if (flyoutTime) flyoutTime.textContent = fullTimeStr;
      if (flyoutDate) flyoutDate.textContent = fullDateStr;
    };

    updateTime();
    setInterval(updateTime, 1000);

    trayClock.addEventListener('click', (e) => {
      e.stopPropagation();
      audio.playClick();
      const isOpen = this.clockFlyout.classList.contains('open');
      if (isOpen) {
        this.clockFlyout.classList.remove('open');
      } else {
        this.clockFlyout.classList.add('open');
        this.startMenu.classList.remove('open');
      }
    });

    if (clockSyncBtn) {
      clockSyncBtn.addEventListener('click', () => {
        audio.playClick();
        clockSyncBtn.textContent = 'Kernel Chrono Drift: Synchronized [0.000ms]';
        clockSyncBtn.style.color = 'var(--status-success)';
        events.emit('secret:trigger-attempt', { id: 'secret_05', source: 'clock_synchronization' });
      });
    }
  }

  setupContextMenu() {
    const desktop = document.getElementById('desktop');
    desktop.addEventListener('contextmenu', (e) => {
      if (e.target.closest('.os-window') || e.target.closest('#taskbar') || e.target.closest('#start-menu')) {
        return;
      }
      e.preventDefault();
      this.contextMenu.style.left = `${Math.min(e.clientX, window.innerWidth - 180)}px`;
      this.contextMenu.style.top = `${Math.min(e.clientY, window.innerHeight - 160)}px`;
      this.contextMenu.classList.add('open');
      this.startMenu.classList.remove('open');
      this.clockFlyout.classList.remove('open');
    });

    this.contextMenu.addEventListener('click', (e) => {
      const item = e.target.closest('.context-menu-item');
      if (!item) return;
      const action = item.dataset.action;
      this.contextMenu.classList.remove('open');
      audio.playClick();
      events.emit('desktop:context-action', action);
    });
  }

  setupDesktopSelection() {
    const desktop = document.getElementById('desktop');
    const box = document.getElementById('selection-box');
    let isSelecting = false;
    let startX = 0;
    let startY = 0;

    desktop.addEventListener('mousedown', (e) => {
      if (e.target.closest('.desktop-icon') || e.target.closest('.os-window') || e.target.closest('.context-menu') || e.button !== 0) {
        return;
      }
      isSelecting = true;
      startX = e.clientX;
      startY = e.clientY;

      box.style.left = `${startX}px`;
      box.style.top = `${startY}px`;
      box.style.width = '0px';
      box.style.height = '0px';
      box.style.display = 'block';

      document.querySelectorAll('.desktop-icon').forEach(icon => icon.classList.remove('selected'));
    });

    window.addEventListener('mousemove', (e) => {
      if (!isSelecting) return;
      const curX = e.clientX;
      const curY = e.clientY;

      const left = Math.min(startX, curX);
      const top = Math.min(startY, curY);
      const width = Math.abs(curX - startX);
      const height = Math.abs(curY - startY);

      box.style.left = `${left}px`;
      box.style.top = `${top}px`;
      box.style.width = `${width}px`;
      box.style.height = `${height}px`;

      const boxRect = box.getBoundingClientRect();
      document.querySelectorAll('.desktop-icon').forEach(icon => {
        const iconRect = icon.getBoundingClientRect();
        const intersects = !(
          iconRect.right < boxRect.left ||
          iconRect.left > boxRect.right ||
          iconRect.bottom < boxRect.top ||
          iconRect.top > boxRect.bottom
        );
        if (intersects) {
          icon.classList.add('selected');
        } else {
          icon.classList.remove('selected');
        }
      });
    });

    window.addEventListener('mouseup', () => {
      if (isSelecting) {
        isSelecting = false;
        box.style.display = 'none';
      }
    });
  }

  setupGlobalClickDismissal() {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#start-menu') && !e.target.closest('#start-button')) {
        this.toggleStartMenu(false);
      }
      if (!e.target.closest('#clock-flyout') && !e.target.closest('#tray-clock')) {
        this.clockFlyout.classList.remove('open');
      }
      if (!e.target.closest('#desktop-context-menu')) {
        this.contextMenu.classList.remove('open');
      }
    });
  }
}

export const wm = new WindowManager();
