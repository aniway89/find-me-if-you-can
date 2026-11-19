import { OSWindow } from '../wm/window.js';
import { getGlobalLeaderboard } from '../core/firebase-service.js';
import { getBadgeClass } from '../engine/ranking.js';
import { state } from '../core/state.js';
import { audio } from '../core/audio.js';

export function openLeaderboard() {
  const win = new OSWindow({
    title: 'Global Leaderboard',
    iconSvg: `<svg viewBox="0 0 24 24" fill="#388bfd"><path d="M16 11V3H8v6H2v12h20V11h-6zm-6-6h4v14h-4V5zm-6 8h4v6H4v-6zm16 6h-4v-8h4v8z"/></svg>`,
    width: 580,
    height: 480
  });

  const loadData = async () => {
    win.setContent(`
      <div class="leaderboard-container">
        <div class="leaderboard-legend">
          <span class="legend-item"><span class="legend-badge badge-explorer">0-5</span> EXPLORER</span>
          <span class="legend-item"><span class="legend-badge badge-investigator">6-15</span> INVESTIGATOR</span>
          <span class="legend-item"><span class="legend-badge badge-engineer">16-24</span> ENGINEER</span>
          <span class="legend-item"><span class="legend-badge badge-hardfind">25-29</span> HARD FIND</span>
          <span class="legend-item"><span class="legend-badge badge-architect">30</span> ARCHITECT</span>
        </div>
        <div class="leaderboard-toolbar">
          <span class="leaderboard-status">Loading global scores...</span>
          <button class="btn btn-sm btn-refresh-lb">Refresh</button>
        </div>
        <div class="leaderboard-table-wrap">
          <table class="leaderboard-table">
            <thead>
              <tr>
                <th style="width: 44px;">#</th>
                <th>Player</th>
                <th>Rank Badge</th>
                <th style="text-align: right; width: 64px;">Points</th>
              </tr>
            </thead>
            <tbody id="lb-body">
              <tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 24px;">Loading...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `);

    const rows = await getGlobalLeaderboard();
    const tbody = win.contentElement.querySelector('#lb-body');
    const statusText = win.contentElement.querySelector('.leaderboard-status');
    const refreshBtn = win.contentElement.querySelector('.btn-refresh-lb');

    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        audio.playClick();
        loadData();
      });
    }

    if (!tbody) return;

    if (!rows || rows.length === 0) {
      statusText.textContent = 'No records submitted yet.';
      tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 24px;">Be the first to record a discovery.</td></tr>`;
      return;
    }

    let userPos = '-';
    tbody.innerHTML = rows.map((r, idx) => {
      const pos = idx + 1;
      const isSelf = r.uid === state.playerId || r.username === state.username;
      if (isSelf && userPos === '-') userPos = pos;
      const badgeCls = getBadgeClass(r.rank);

      return `
        <tr class="${isSelf ? 'lb-row-self' : ''}">
          <td style="font-weight: 600;">${pos}</td>
          <td>${r.username || 'Anonymous'} ${isSelf ? '<span class="lb-you-tag">(You)</span>' : ''}</td>
          <td><span class="rank-badge ${badgeCls}">${r.rank}</span></td>
          <td style="text-align: right; font-weight: 600; font-family: var(--font-mono);">${r.points}</td>
        </tr>
      `;
    }).join('');

    statusText.textContent = `Your position: #${userPos} (${state.points} pts)`;
  };

  loadData();
  return win;
}
