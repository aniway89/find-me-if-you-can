/**
 * Find Me If You Can — Mail Application
 */
import { OSWindow } from '../wm/window.js';
import { audio } from '../core/audio.js';
import { events } from '../core/events.js';

export function openMail() {
  const EMAILS = [
    {
      id: 'm1',
      folder: 'inbox',
      sender: 'IT Operations <sysadmin@phantom.net>',
      subject: 'Welcome to PhantomOS Workstation',
      date: 'Nov 24, 2026',
      body: `Welcome to the PhantomOS development workstation environment.

All new engineers must complete their environment onboarding by checking the File Explorer and verifying file system integrity with the terminal tool 'chkfs'.

If you encounter anomalous system behavior, consult the engineering blog or review previous communications in your Archive folder.`
    },
    {
      id: 'm2',
      folder: 'inbox',
      sender: 'Security Officer <security@phantom.net>',
      subject: 'Security Notice: Bitrot detected in configuration nodes',
      date: 'Nov 22, 2026',
      body: `Notice to all staff:

Integrity scans have reported syntax anomalies in /etc/sysconfig.env, /etc/services.json, and /sys/manifest.xml.
Please review these files immediately using the Code Editor and verify all port allocations and XML closures.

Do not attempt to execute unauthorized binaries from /bin without proper clearance.`
    },
    {
      id: 'm3',
      folder: 'archive',
      sender: 'Dr. Elena Vance <elena.vance@phantom.net>',
      subject: 'CONFIDENTIAL: Project Orion Handoff and Master Key',
      date: 'Oct 28, 2024',
      body: `To Whoever Inherits This Workstation,

If you are reading this archived message, our team has already been reassigned following Incident 404.

The Orion simulation core was not destroyed. We locked the primary state hash in /sys/core_state.dat and preserved a mirror image inside /backup/core_state.dat.

To reconverge the system:
1. Ensure all 10 virtual filesystem errors are rectified.
2. Synchronize the core state hash.
3. Access the subterranean vault key in /sys/.vault/vault_key.pem.
4. Execute 'phantom-core --synthesize' in the terminal.

The truth of this system belongs to the Architect. Do not let the simulation remain fractured.

— Elena`
    },
    {
      id: 'm4',
      folder: 'trash',
      sender: 'Diagnostics Engine <daemon@localhost>',
      subject: 'Automatic Crash Dump: Driver 0x9F Desynchronization',
      date: 'Oct 29, 2024',
      body: `Automated diagnostic alert:
Driver 0x9F (Quantum Bridge) reported parity anomaly. Device set to fail-safe state in Device Manager.`
    }
  ];

  let currentFolder = 'inbox';
  let activeEmail = EMAILS.find(e => e.folder === currentFolder) || EMAILS[0];

  const win = new OSWindow({
    title: 'Phantom Mail — Local Archive Client',
    iconSvg: `<svg viewBox="0 0 24 24" fill="#58a6ff"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    width: 780,
    height: 480
  });

  const render = () => {
    const filteredEmails = EMAILS.filter(e => e.folder === currentFolder);

    win.setContent(`
      <div class="mail-container">
        <div class="mail-folders">
          <div class="mail-folder-item ${currentFolder === 'inbox' ? 'active' : ''}" data-folder="inbox">📥 Inbox (${EMAILS.filter(e => e.folder === 'inbox').length})</div>
          <div class="mail-folder-item ${currentFolder === 'archive' ? 'active' : ''}" data-folder="archive">📁 Archive (${EMAILS.filter(e => e.folder === 'archive').length})</div>
          <div class="mail-folder-item ${currentFolder === 'trash' ? 'active' : ''}" data-folder="trash">🗑️ Trash (${EMAILS.filter(e => e.folder === 'trash').length})</div>
        </div>
        <div class="mail-list">
          ${filteredEmails.map(m => `
            <div class="mail-item ${activeEmail && activeEmail.id === m.id ? 'active' : ''}" data-id="${m.id}">
              <div class="mail-item-sender">${m.sender}</div>
              <div class="mail-item-subject">${m.subject}</div>
              <div class="mail-item-preview">${m.body.slice(0, 50)}...</div>
            </div>
          `).join('')}
        </div>
        <div class="mail-reading-pane">
          ${activeEmail ? `
            <div class="mail-header-subject">${activeEmail.subject}</div>
            <div class="mail-header-meta">
              <div><strong>From:</strong> ${activeEmail.sender}</div>
              <div><strong>Date:</strong> ${activeEmail.date}</div>
            </div>
            <div class="mail-body-content">${activeEmail.body}</div>
          ` : '<div style="color: var(--text-muted); padding: 40px; text-align: center;">No message selected.</div>'}
        </div>
      </div>
    `);

    // Folder switching
    win.contentElement.querySelectorAll('.mail-folder-item').forEach(f => {
      f.addEventListener('click', () => {
        audio.playClick();
        currentFolder = f.dataset.folder;
        activeEmail = EMAILS.find(e => e.folder === currentFolder) || null;
        render();
      });
    });

    // Email selecting
    win.contentElement.querySelectorAll('.mail-item').forEach(item => {
      item.addEventListener('click', () => {
        audio.playClick();
        const found = EMAILS.find(e => e.id === item.dataset.id);
        if (found) {
          activeEmail = found;
          render();

          // Secret 13: Finding and reading archived communication
          if (found.id === 'm3') {
            events.emit('secret:trigger-attempt', { id: 'secret_13', source: 'mail_archived_memo' });
          }
        }
      });
    });
  };

  render();
  return win;
}
