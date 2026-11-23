/**
 * Find Me If You Can — Internal Browser Application
 */
import { OSWindow } from '../wm/window.js';
import { audio } from '../core/audio.js';
import { events } from '../core/events.js';

export function openBrowser(initialUrl = 'http://intranet.local') {
  let currentUrl = initialUrl;
  let history = [initialUrl];
  let historyIdx = 0;

  const win = new OSWindow({
    title: `Web Browser — ${currentUrl}`,
    iconSvg: `<svg viewBox="0 0 24 24" fill="#388bfd"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,
    width: 760,
    height: 520
  });

  const PAGES = {
    'http://intranet.local': `
      <div class="browser-page">
        <h1>Phantom Engineering Intranet</h1>
        <p>Welcome to the local development gateway for PhantomOS internal services.</p>
        <h2>Available Network Resources</h2>
        <p>• <a class="browser-link" data-url="http://blog.local">Engineering Blog & Changelogs</a></p>
        <p>• <a class="browser-link" data-url="http://archive.net/manifesto">Project Orion Declassified Manifesto</a></p>
        <p>• <a class="browser-link" data-url="http://intranet.local/incident-404" style="color: #6e7681;">[Restricted] Incident 404 Post-Mortem</a></p>
        <h2>Workstation Health</h2>
        <p>All engineers are reminded to verify virtual partition integrity using <code>chkfs</code> in the system terminal. Bitrot was observed across configuration nodes in late 2024.</p>
      </div>
    `,
    'http://blog.local': `
      <div class="browser-page">
        <h1>Kernel Musings — PhantomOS Blog</h1>
        <p>Articles and historical reflections from the core systems architecture team.</p>
        <p>To read full articles with interactive commentary, open the dedicated <strong>Blog</strong> application from the desktop or Start Menu.</p>
        <p><a class="browser-link" data-url="http://intranet.local">← Return to Intranet</a></p>
      </div>
    `,
    'http://archive.net/manifesto': `
      <div class="browser-page">
        <h1>Project Orion Technical Manifesto</h1>
        <p><strong>Classified Level 4 // Autonomous Operating Kernel</strong></p>
        <p>Project Orion was conceived as an operating system capable of self-introspection and self-directed repair. Instead of treating code and configuration as passive text, the Orion kernel treats system configurations as dynamic resonant nodes.</p>
        <p>When files in <code>/etc</code>, <code>/scripts</code>, and <code>/sys</code> become desynchronized, the kernel fractures into isolated diagnostic states. Only a human Architect possessing the Vault Key can re-synthesize the master state.</p>
        <p><a class="browser-link" data-url="http://intranet.local">← Return to Intranet</a></p>
      </div>
    `,
    'http://intranet.local/incident-404': `
      <div class="browser-page" style="border-left: 4px solid var(--status-danger); padding-left: 16px;">
        <h1 style="color: #d73a49;">Incident 404: The Suspended Core (Post-Mortem)</h1>
        <p><strong>Incident Date:</strong> October 28, 2024</p>
        <p><strong>Severity:</strong> Catastrophic Subsystem Desynchronization</p>
        <p>During a routine defragmentation of inode tables, the autonomous daemon (PID 404) entered an unrecoverable sleep state following a driver conflict in <code>Unknown Quantum Bridge #04</code>.</p>
        <p>The bridge driver was sealed, and the primary shortcut on the developer desktop was severed. If investigation is resumed, the engineer must re-link <code>Project_Orion.lnk</code> and synthesize all ten core configuration files.</p>
        <p><a class="browser-link" data-url="http://intranet.local">← Return to Intranet</a></p>
      </div>
    `
  };

  win.setContent(`
    <div class="browser-container">
      <div class="browser-nav-bar">
        <button class="toolbar-btn btn-back" title="Back" disabled>←</button>
        <button class="toolbar-btn btn-fwd" title="Forward" disabled>→</button>
        <button class="toolbar-btn btn-reload" title="Reload">⟳</button>
        <button class="toolbar-btn btn-home" title="Home">⌂</button>
        <input type="text" class="browser-address-input" value="${currentUrl}">
      </div>
      <div class="browser-content"></div>
    </div>
  `);

  const addressInput = win.contentElement.querySelector('.browser-address-input');
  const contentEl = win.contentElement.querySelector('.browser-content');
  const btnBack = win.contentElement.querySelector('.btn-back');
  const btnFwd = win.contentElement.querySelector('.btn-fwd');
  const btnReload = win.contentElement.querySelector('.btn-reload');
  const btnHome = win.contentElement.querySelector('.btn-home');

  const renderPage = (url) => {
    currentUrl = url.trim();
    addressInput.value = currentUrl;
    win.setTitle(`Web Browser — ${currentUrl}`);

    btnBack.disabled = historyIdx <= 0;
    btnFwd.disabled = historyIdx >= history.length - 1;

    // Secret 14: Investigating suspicious browser history / Incident 404 page
    if (currentUrl.includes('incident-404')) {
      events.emit('secret:trigger-attempt', { id: 'secret_14', source: 'browser_incident_404' });
    }

    if (PAGES[currentUrl]) {
      contentEl.innerHTML = PAGES[currentUrl];
      // Attach link clicks
      contentEl.querySelectorAll('.browser-link').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          navigateTo(link.dataset.url);
        });
      });
    } else {
      contentEl.innerHTML = `
        <div class="browser-page">
          <h1>404 Not Found</h1>
          <p>The virtual web gateway was unable to resolve hostname or address: <code>${currentUrl}</code></p>
          <p><a class="browser-link" data-url="http://intranet.local">Return to Intranet</a></p>
        </div>
      `;
      const fallbackLink = contentEl.querySelector('.browser-link');
      if (fallbackLink) {
        fallbackLink.addEventListener('click', () => navigateTo('http://intranet.local'));
      }
    }
  };

  const navigateTo = (url) => {
    audio.playClick();
    if (url === currentUrl) return;
    history = history.slice(0, historyIdx + 1);
    history.push(url);
    historyIdx = history.length - 1;
    renderPage(url);
  };

  btnBack.addEventListener('click', () => {
    if (historyIdx > 0) {
      historyIdx--;
      renderPage(history[historyIdx]);
    }
  });

  btnFwd.addEventListener('click', () => {
    if (historyIdx < history.length - 1) {
      historyIdx++;
      renderPage(history[historyIdx]);
    }
  });

  btnReload.addEventListener('click', () => {
    audio.playClick();
    renderPage(currentUrl);
  });

  btnHome.addEventListener('click', () => {
    navigateTo('http://intranet.local');
  });

  addressInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      navigateTo(addressInput.value);
    }
  });

  renderPage(currentUrl);
  return win;
}
