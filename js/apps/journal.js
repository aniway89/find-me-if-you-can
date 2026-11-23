import { OSWindow } from '../wm/window.js';
import { state } from '../core/state.js';
import { SECRETS } from '../engine/secret-definitions.js';
import { getRankInfo, getBadgeClass } from '../engine/ranking.js';
import { events } from '../core/events.js';
import { openLeaderboard } from './leaderboard.js';
import { wm } from '../wm/window-manager.js';

export function openJournal() {
  const win = new OSWindow({
    title: 'Discovery Journal',
    iconSvg: `<svg viewBox="0 0 24 24" fill="#bc8cff"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-2h2v2zm0-4H7v-2h2v2zm0-4H7V7h2v2zm8 8h-6v-2h6v2zm0-4h-6v-2h6v2zm0-4h-6V7h6v2z"/></svg>`,
    width: 680,
    height: 480
  });

  const render = () => {
    const rankInfo = getRankInfo(state.points);
    const discoveredIds = Array.from(state.discoveredSecrets);
    const badgeCls = getBadgeClass(rankInfo.name);

    win.setContent(`
      <div class="journal-container">
        <div class="journal-header">
          <div class="journal-player-badge">
            <span class="rank-badge ${badgeCls}">${rankInfo.name}</span>
            <span style="font-weight: 600;">${state.username || 'Developer'}</span>
            <span class="journal-points-tag">${state.points} Point${state.points === 1 ? '' : 's'}</span>
          </div>
          <div>
            <button class="btn btn-sm btn-primary" id="btn-open-lb-from-j">Global Leaderboard</button>
          </div>
        </div>

        <div class="journal-list">
          ${discoveredIds.length === 0 ? `
            <div style="text-align: center; padding: 36px; color: var(--text-muted); line-height: 1.5;">
              <div style="font-size: 13px; font-weight: 600; color: var(--text-secondary); margin-bottom: 4px;">No discoveries recorded yet.</div>
              Explore applications, inspect files, and fix broken code to uncover secrets.
            </div>
          ` : ''}

          ${discoveredIds.map(id => {
            const secret = SECRETS[id];
            const timestamp = state.discoveryTimestamps[id] ? new Date(state.discoveryTimestamps[id]).toLocaleString() : 'Verified';
            return `
              <div class="journal-entry">
                <div class="journal-entry-header">
                  <div class="journal-entry-title">${secret.title}</div>
                  <span class="journal-entry-tier">${secret.difficulty} Tier • +1 Pt</span>
                </div>
                <div class="journal-entry-desc">${secret.description}</div>
                <div class="journal-entry-timestamp">Discovered: ${timestamp}</div>
              </div>
            `;
          }).join('')}

          ${Object.keys(SECRETS).filter(k => !state.discoveredSecrets.has(k)).map(() => `
            <div class="journal-entry" style="opacity: 0.4; border-style: dashed;">
              <div class="journal-entry-header">
                <div class="journal-entry-title" style="font-family: var(--font-mono); color: var(--text-muted);">[ENCRYPTED DISCOVERY]</div>
                <span class="journal-entry-tier" style="background: transparent; color: var(--text-muted); border: 1px solid var(--border-subtle);">Classified</span>
              </div>
              <div class="journal-entry-desc" style="color: var(--text-muted);">
                Awaiting investigation by a developer.
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `);

    const btnLb = win.contentElement.querySelector('#btn-open-lb-from-j');
    if (btnLb) {
      btnLb.addEventListener('click', () => {
        const lbWin = openLeaderboard();
        if (lbWin) wm.createWindow(lbWin);
      });
    }
  };

  const unsub = events.on('secret:unlocked', () => {
    if (win.element && win.element.parentNode) render();
  });

  win.onClose = () => unsub();
  render();
  return win;
}
