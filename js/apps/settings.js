import { OSWindow } from '../wm/window.js';
import { state } from '../core/state.js';
import { audio } from '../core/audio.js';
import { events } from '../core/events.js';
import { vfs } from '../core/vfs.js';

export function openSettings() {
  let activeTab = 'developer';

  const win = new OSWindow({
    title: 'System Settings',
    iconSvg: `<svg viewBox="0 0 24 24" fill="#8b949e"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`,
    width: 600,
    height: 420
  });

  const render = () => {
    win.setContent(`
      <div class="settings-container">
        <div class="settings-nav">
          <div class="settings-nav-item ${activeTab === 'profile' ? 'active' : ''}" data-tab="profile">👤 Profile</div>
          <div class="settings-nav-item ${activeTab === 'developer' ? 'active' : ''}" data-tab="developer">⚙️ Developer</div>
          <div class="settings-nav-item ${activeTab === 'system' ? 'active' : ''}" data-tab="system">💻 System</div>
        </div>
        <div class="settings-panel">
          ${activeTab === 'profile' ? `
            <div class="settings-section-title">Developer Identity</div>
            <div class="settings-row">
              <div>
                <div class="settings-label-title">Username</div>
                <div class="settings-label-desc">Display identity for system terminals and leaderboard.</div>
              </div>
              <div style="display: flex; gap: 8px;">
                <input type="text" id="setting-username-input" class="start-search-input" style="width: 140px;" value="${state.username}">
                <button class="btn btn-sm btn-primary" id="btn-save-username">Save</button>
              </div>
            </div>
            <div class="settings-row">
              <div>
                <div class="settings-label-title">System Audio Synthesizer</div>
                <div class="settings-label-desc">Sound effects for UI operations and secret unlocks.</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="setting-audio-toggle" ${audio.enabled ? 'checked' : ''}>
                <span class="toggle-slider"></span>
              </label>
            </div>
          ` : activeTab === 'developer' ? `
            <div class="settings-section-title">Developer Options</div>
            <div class="settings-row">
              <div>
                <div class="settings-label-title">Developer Mode</div>
                <div class="settings-label-desc">Enable kernel assertions and diagnostic access.</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="setting-devmode-toggle" ${state.developerMode ? 'checked' : ''}>
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="settings-row">
              <div>
                <div class="settings-label-title" style="color: var(--status-warning);">Experimental Hyper-Threading (Corrupted Register 0xFE)</div>
                <div class="settings-label-desc">Toggle to clear anomalous register state.</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="setting-corrupted-toggle" data-secret="secret_08">
                <span class="toggle-slider" style="border-color: var(--status-warning);"></span>
              </label>
            </div>
          ` : `
            <div class="settings-section-title">System & Storage</div>
            <div class="settings-row">
              <div>
                <div class="settings-label-title">OS Build</div>
                <div class="settings-label-desc">PhantomOS 4.0.9-LTS Developer Preview</div>
              </div>
            </div>
            <div class="settings-row">
              <div>
                <div class="settings-label-title">Virtual Partition Storage</div>
                <div class="settings-label-desc">IndexedDB virtual filesystem</div>
              </div>
              <button class="btn btn-sm" id="btn-reset-vfs" style="color: var(--status-danger);">Reset Filesystem</button>
            </div>
          `}
        </div>
      </div>
    `);

    win.contentElement.querySelectorAll('.settings-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        audio.playClick();
        activeTab = item.dataset.tab;
        render();
      });
    });

    const btnSaveUser = win.contentElement.querySelector('#btn-save-username');
    const userInput = win.contentElement.querySelector('#setting-username-input');
    if (btnSaveUser && userInput) {
      btnSaveUser.addEventListener('click', () => {
        audio.playClick();
        state.setUsername(userInput.value);
        events.emit('system:show-toast', { title: 'Settings', desc: 'Username saved.', type: 'success' });
      });
    }

    const audioToggle = win.contentElement.querySelector('#setting-audio-toggle');
    if (audioToggle) {
      audioToggle.addEventListener('change', () => {
        audio.enabled = audioToggle.checked;
        if (audio.enabled) audio.playClick();
      });
    }

    const devToggle = win.contentElement.querySelector('#setting-devmode-toggle');
    if (devToggle) {
      devToggle.addEventListener('change', () => {
        audio.playClick();
        state.setDeveloperMode(devToggle.checked);
        if (devToggle.checked) {
          events.emit('secret:trigger-attempt', { id: 'secret_11', source: 'settings_developer_mode' });
        }
      });
    }

    const corruptToggle = win.contentElement.querySelector('#setting-corrupted-toggle');
    if (corruptToggle) {
      corruptToggle.addEventListener('change', () => {
        audio.playClick();
        events.emit('secret:trigger-attempt', { id: 'secret_08', source: 'settings_corrupted_register' });
      });
    }

    const btnResetVfs = win.contentElement.querySelector('#btn-reset-vfs');
    if (btnResetVfs) {
      btnResetVfs.addEventListener('click', async () => {
        if (confirm('Reset virtual filesystem to defaults?')) {
          audio.playClick();
          await vfs.reset();
          events.emit('system:show-toast', { title: 'Storage', desc: 'Partition reset.', type: 'info' });
        }
      });
    }
  };

  render();
  return win;
}
