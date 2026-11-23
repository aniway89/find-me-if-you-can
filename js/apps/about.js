/**
 * Find Me If You Can — About OS Application
 */
import { OSWindow } from '../wm/window.js';
import { audio } from '../core/audio.js';
import { events } from '../core/events.js';

export function openAbout() {
  const win = new OSWindow({
    title: 'About PhantomOS',
    iconSvg: `<svg viewBox="0 0 24 24" fill="#388bfd"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="2"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" stroke-width="2"/></svg>`,
    width: 480,
    height: 420
  });

  win.setContent(`
    <div class="about-container">
      <div class="about-logo-wrapper" id="about-logo-btn" title="Click to pulse core oscillator">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" stroke="#58a6ff" fill="#388bfd" fill-opacity="0.3"></polygon>
          <polyline points="2 17 12 22 22 17" stroke="#58a6ff"></polyline>
          <polyline points="2 12 12 17 22 12" stroke="#58a6ff"></polyline>
        </svg>
      </div>

      <div class="about-os-title">PhantomOS Workstation</div>
      <div class="about-version" id="about-kernel-version" title="Click to inspect kernel build lineage">
        Version 4.0.9 (Build 20261124-KERNEL-ORION)
      </div>

      <div class="about-spec-box">
        <div><strong>Kernel Architecture:</strong> x86_64-simulated (Harmonic VFS)</div>
        <div><strong>Storage Subsystem:</strong> IndexedDB Sandboxed Partition</div>
        <div><strong>Window Runtime:</strong> Native DOM Window Manager 2.0</div>
        <div><strong>Origin:</strong> Project Orion Research Division (2024–2026)</div>
        <div style="margin-top: 6px; font-size: 10.5px; color: var(--text-muted);">
          Licensed for developer investigation and system recovery.
        </div>
      </div>

      <button class="btn btn-sm btn-primary" id="btn-about-close">Close</button>
    </div>
  `);

  const logoBtn = win.contentElement.querySelector('#about-logo-btn');
  if (logoBtn) {
    logoBtn.addEventListener('click', () => {
      audio.playClick();
      logoBtn.style.transform = 'scale(1.15)';
      setTimeout(() => { logoBtn.style.transform = 'scale(1)'; }, 200);
    });
  }

  // Secret 04: Investigating OS version string
  const versionBtn = win.contentElement.querySelector('#about-kernel-version');
  if (versionBtn) {
    versionBtn.addEventListener('click', () => {
      audio.playClick();
      versionBtn.style.backgroundColor = 'var(--status-purple)';
      versionBtn.style.color = '#ffffff';
      versionBtn.textContent = 'Version 4.0.9-LTS [Kernel Lineage Verified]';
      events.emit('secret:trigger-attempt', { id: 'secret_04', source: 'about_version_click' });
    });
  }

  const btnClose = win.contentElement.querySelector('#btn-about-close');
  if (btnClose) {
    btnClose.addEventListener('click', () => win.close());
  }

  return win;
}
