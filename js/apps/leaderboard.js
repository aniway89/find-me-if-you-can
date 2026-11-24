import { OSWindow } from '../wm/window.js';
import { getGlobalLeaderboard, subscribeToLeaderboard, isFirebaseConfigured, getCurrentUid } from '../core/firebase-service.js';
import { getBadgeClass } from '../engine/ranking.js';
import { state } from '../core/state.js';
import { audio } from '../core/audio.js';

export function openLeaderboard() {
  let unsubscribeLive = null;
  let allRows = [];
  let filterText = '';
  let isLoading = true;
  let hasError = false;
  let errorMessage = '';

  const win = new OSWindow({
    title: 'Global Leaderboard',
    iconSvg: `<svg viewBox="0 0 24 24" fill="#388bfd"><path d="M16 11V3H8v6H2v12h20V11h-6zm-6-6h4v14h-4V5zm-6 8h4v6H4v-6zm16 6h-4v-8h4v8z"/></svg>`,
    width: 620,
    height: 520,
    minWidth: 420,
    minHeight: 360
  });

  const configured = isFirebaseConfigured();

  const renderSkeleton = () => {
    return `
      <div class="lb-skeleton-row"></div>
      <div class="lb-skeleton-row"></div>
      <div class="lb-skeleton-row"></div>
      <div class="lb-skeleton-row"></div>
      <div class="lb-skeleton-row"></div>
    `;
  };

  const renderTableRows = (rows, currentUid, currentUsername) => {
    if (!rows || rows.length === 0) {
      return `<tr><td colspan="4" class="lb-empty-cell">No players registered yet. Be the first to discover a secret.</td></tr>`;
    }

    const filtered = filterText
      ? rows.filter(r => (r.username || '').toLowerCase().includes(filterText.toLowerCase()))
      : rows;

    if (filtered.length === 0) {
      return `<tr><td colspan="4" class="lb-empty-cell">No players matching "${filterText}".</td></tr>`;
    }

    return filtered.map((r, idx) => {
      const pos = idx + 1;
      const isSelf = r.uid === currentUid || r.username === currentUsername;
      const badgeCls = getBadgeClass(r.rank);
      const points = typeof r.score === 'number' ? r.score : (r.points || 0);

      return `
        <tr class="${isSelf ? 'lb-row-self' : ''}">
          <td class="lb-col-pos">${pos}</td>
          <td class="lb-col-user">
            <span class="lb-username-text">${escapeHtml(r.username || 'Anonymous')}</span>
            ${isSelf ? '<span class="lb-you-tag">YOU</span>' : ''}
          </td>
          <td class="lb-col-rank">
            <span class="rank-badge ${badgeCls}">${r.rank || 'EXPLORER'}</span>
          </td>
          <td class="lb-col-score">${points}</td>
        </tr>
      `;
    }).join('');
  };

  const escapeHtml = (str) => {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  const updateUI = () => {
    const curUid = getCurrentUid();
    const curName = state.username;

    let userPos = null;
    allRows.forEach((r, idx) => {
      if ((r.uid && r.uid === curUid) || (r.username && r.username === curName)) {
        userPos = idx + 1;
      }
    });

    const isUserInTop = userPos !== null && userPos <= allRows.length;
    const badgeCls = getBadgeClass(state.rank);

    win.setContent(`
      <div class="leaderboard-container">
        <!-- Compact Badge Legend -->
        <div class="leaderboard-legend">
          <span class="legend-item"><span class="legend-badge badge-explorer">0-5</span> EXPLORER</span>
          <span class="legend-item"><span class="legend-badge badge-investigator">6-15</span> INVESTIGATOR</span>
          <span class="legend-item"><span class="legend-badge badge-engineer">16-24</span> ENGINEER</span>
          <span class="legend-item"><span class="legend-badge badge-hardfind">25-29</span> HARD FIND</span>
          <span class="legend-item"><span class="legend-badge badge-architect">30</span> ARCHITECT</span>
        </div>

        <!-- Mode banner if unconfigured -->
        ${!configured ? `
          <div class="leaderboard-config-banner">
            <span>Local Mode: Global sync requires Firebase configuration in <code>js/core/firebase-config.js</code></span>
          </div>
        ` : ''}

        <!-- Toolbar: User profile, Search, Live sync indicator, Refresh -->
        <div class="leaderboard-toolbar">
          <div class="lb-user-summary">
            <span class="lb-summary-label">Your Standing:</span>
            <span class="lb-summary-pos">${userPos ? `#${userPos}` : 'Unranked'}</span>
            <span class="rank-badge ${badgeCls}">${state.rank}</span>
            <span class="lb-summary-pts">${state.points} pt${state.points === 1 ? '' : 's'}</span>
          </div>
          <div class="lb-toolbar-actions">
            <input type="text" id="lb-search-input" class="lb-search-input" placeholder="Search player..." value="${escapeHtml(filterText)}" autocomplete="off" />
            <button class="btn btn-sm" id="lb-refresh-btn" title="Refresh Leaderboard">
              <span class="lb-sync-dot ${configured ? 'live' : 'local'}"></span>
              Refresh
            </button>
          </div>
        </div>

        <!-- Table Header and Scrollable Body -->
        <div class="leaderboard-table-wrap">
          <table class="leaderboard-table">
            <thead>
              <tr>
                <th style="width: 48px;">Rank</th>
                <th>Player</th>
                <th style="width: 140px;">Developer Rank</th>
                <th style="width: 70px; text-align: right;">Points</th>
              </tr>
            </thead>
            <tbody id="lb-table-body">
              ${isLoading ? `<tr><td colspan="4">${renderSkeleton()}</td></tr>` : ''}
              ${hasError ? `<tr><td colspan="4" class="lb-error-cell">Error loading leaderboard: ${escapeHtml(errorMessage)} <br><button class="btn btn-sm" id="lb-retry-btn" style="margin-top:8px;">Retry</button></td></tr>` : ''}
              ${!isLoading && !hasError ? renderTableRows(allRows, curUid, curName) : ''}
            </tbody>
          </table>
        </div>

        <!-- Pinned Player Footer if below view -->
        ${!isUserInTop && curName ? `
          <div class="leaderboard-pinned-footer">
            <span style="color: var(--text-muted); font-size: 11px;">Your profile:</span>
            <span style="font-weight: 600;">${escapeHtml(curName)}</span>
            <span class="rank-badge ${badgeCls}">${state.rank}</span>
            <span style="font-family: var(--font-mono); font-weight: 600; color: var(--status-success);">${state.points} pts</span>
          </div>
        ` : ''}

        <!-- Status footer -->
        <div class="leaderboard-footer-bar">
          <span id="lb-player-count">Total Players: ${allRows.length}</span>
          <span style="color: var(--text-muted);">Sorted by Points (Score desc, Time asc)</span>
        </div>
      </div>
    `);

    // Attach listeners
    const searchInput = win.contentElement.querySelector('#lb-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        filterText = e.target.value.trim();
        const tbody = win.contentElement.querySelector('#lb-table-body');
        if (tbody && !isLoading && !hasError) {
          tbody.innerHTML = renderTableRows(allRows, curUid, curName);
        }
      });
    }

    const refreshBtn = win.contentElement.querySelector('#lb-refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        audio.playClick();
        loadLeaderboardData();
      });
    }

    const retryBtn = win.contentElement.querySelector('#lb-retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        audio.playClick();
        loadLeaderboardData();
      });
    }
  };

  const loadLeaderboardData = () => {
    isLoading = true;
    hasError = false;
    updateUI();

    if (unsubscribeLive) {
      unsubscribeLive();
      unsubscribeLive = null;
    }

    unsubscribeLive = subscribeToLeaderboard(
      (data) => {
        isLoading = false;
        hasError = false;
        allRows = data.rows || [];
        updateUI();
      },
      (err) => {
        isLoading = false;
        hasError = true;
        errorMessage = err.message || 'Network or permission error';
        updateUI();
      },
      50
    );
  };

  loadLeaderboardData();

  win.onClose = () => {
    if (unsubscribeLive) {
      unsubscribeLive();
      unsubscribeLive = null;
    }
  };

  return win;
}
