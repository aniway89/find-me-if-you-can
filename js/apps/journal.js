import { OSWindow } from '../wm/window.js';
import { state } from '../core/state.js';
import { SECRETS, CORE_SECRETS } from '../engine/secret-definitions.js';
import { getRankInfo, getBadgeClass } from '../engine/ranking.js';
import { events } from '../core/events.js';
import { openLeaderboard } from './leaderboard.js';
import { wm } from '../wm/window-manager.js';
import { architectRegistry } from '../engine/architect-registry.js';

export function openJournal() {
  let activeTab = 'architect'; // 'core' or 'architect'
  let selectedCategory = 'all';

  const win = new OSWindow({
    title: 'Discovery Journal & Architect+ Registry',
    iconSvg: `<svg viewBox="0 0 24 24" fill="#bc8cff"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-2h2v2zm0-4H7v-2h2v2zm0-4H7V7h2v2zm8 8h-6v-2h6v2zm0-4h-6v-2h6v2zm0-4h-6V7h6v2z"/></svg>`,
    width: 760,
    height: 560,
    minWidth: 540,
    minHeight: 400
  });

  const render = () => {
    const rankInfo = getRankInfo(state.points);
    const badgeCls = getBadgeClass(rankInfo.name);
    const progress = architectRegistry.getProgress();

    win.setContent(`
      <div class="journal-container">
        <!-- Top Bar -->
        <div class="journal-header">
          <div class="journal-player-badge">
            <span class="rank-badge ${badgeCls}">${rankInfo.name}</span>
            <span style="font-weight: 600;">${state.username || 'Developer'}</span>
            <span class="journal-points-tag">${state.points} / 130 Points</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-sm" id="btn-tab-architect" style="${activeTab === 'architect' ? 'background: rgba(188, 140, 255, 0.2); color: #bc8cff; border-color: #bc8cff;' : ''}">Tier 6: Architect+</button>
            <button class="btn btn-sm" id="btn-tab-core" style="${activeTab === 'core' ? 'background: rgba(56, 139, 253, 0.2); color: #58a6ff; border-color: #388bfd;' : ''}">Core (01–30)</button>
            <button class="btn btn-sm btn-primary" id="btn-open-lb-from-j">Leaderboard</button>
          </div>
        </div>

        ${activeTab === 'architect' ? renderArchitectTab(progress) : renderCoreTab()}
      </div>
    `);

    attachListeners(progress);
  };

  const renderArchitectTab = (progress) => {
    const categories = architectRegistry.getCategories();
    let secretsToShow = Object.values(architectRegistry.getArchitectSecrets());
    if (selectedCategory !== 'all') {
      secretsToShow = secretsToShow.filter(s => s.categoryId === selectedCategory);
    }

    return `
      <!-- Stats & Progress -->
      <div class="architect-stats-card">
        <div class="architect-stats-row">
          <div>
            <span style="font-size: 13px; font-weight: 600; color: var(--text-primary);">Architect+ Mastery:</span>
            <span style="font-size: 13px; color: #bc8cff; font-weight: 700; margin-left: 6px;">${progress.architectDiscovered} / 100</span>
            <span style="font-size: 11px; color: var(--text-muted); margin-left: 4px;">(${progress.architectPercentage}%)</span>
          </div>
          <div style="font-size: 12px; color: var(--text-secondary);">
            Global System Progress: <strong>${progress.totalDiscovered} / 130</strong>
          </div>
        </div>
        <div class="architect-progress-bar-bg">
          <div class="architect-progress-bar-fill" style="width: ${progress.architectPercentage}%;"></div>
        </div>

        <!-- Category Selector -->
        <div class="architect-cat-pills">
          <button class="cat-pill ${selectedCategory === 'all' ? 'active' : ''}" data-cat="all">
            All Categories (${progress.architectDiscovered}/100)
          </button>
          ${progress.categoryStats.map(c => `
            <button class="cat-pill ${selectedCategory === c.id ? 'active' : ''}" data-cat="${c.id}">
              ${c.icon} ${c.name} (${c.solved}/${c.total})
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Secrets List -->
      <div class="journal-list" style="margin-top: 12px;">
        ${secretsToShow.map(s => renderArchitectSecretItem(s)).join('')}
      </div>
    `;
  };

  const renderArchitectSecretItem = (s) => {
    const isUnlocked = state.discoveredSecrets.has(s.id);
    const timestamp = state.discoveryTimestamps[s.id] ? new Date(state.discoveryTimestamps[s.id]).toLocaleString() : 'Verified';
    const unlockedHintTier = architectRegistry.getHintTierUnlocked(s.id);

    if (isUnlocked) {
      return `
        <div class="journal-entry architect-entry-unlocked">
          <div class="journal-entry-header">
            <div class="journal-entry-title">
              <span style="color: #bc8cff; font-family: var(--font-mono); font-size: 12px; margin-right: 6px;">[${s.id}]</span>
              ${s.title}
            </div>
            <span class="journal-entry-tier" style="background: rgba(188, 140, 255, 0.15); color: #bc8cff; border: 1px solid rgba(188, 140, 255, 0.4);">
              ${s.category} • +1 Pt
            </span>
          </div>
          <div class="journal-entry-desc">${s.description}</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px; font-style: italic;">
            ${s.unlockMessage}
          </div>
          <div class="journal-entry-timestamp">Discovered: ${timestamp}</div>
        </div>
      `;
    }

    // Locked with progressive hint expansion
    return `
      <div class="journal-entry architect-entry-locked">
        <div class="journal-entry-header">
          <div class="journal-entry-title" style="color: var(--text-secondary);">
            <span style="color: var(--text-muted); font-family: var(--font-mono); font-size: 12px; margin-right: 6px;">[${s.id}]</span>
            ${s.title}
          </div>
          <span class="journal-entry-tier" style="background: transparent; color: var(--text-muted); border: 1px solid var(--border-subtle);">
            ${s.category} • Locked
          </span>
        </div>
        <div class="journal-entry-desc" style="color: var(--text-muted);">
          Awaiting technical investigation. Review system logs, terminal utilities, and code configurations.
        </div>

        <!-- Progressive Hints -->
        <div class="hint-container">
          <div class="hint-actions">
            <span style="font-size: 11px; color: var(--text-muted); margin-right: 6px;">Progressive Hints:</span>
            <button class="btn-hint ${unlockedHintTier >= 1 ? 'revealed' : ''}" data-action="reveal-hint" data-secret="${s.id}" data-tier="1">
              ${unlockedHintTier >= 1 ? 'Hint 1 (Vague)' : 'Unlock Hint 1'}
            </button>
            <button class="btn-hint ${unlockedHintTier >= 2 ? 'revealed' : ''}" data-action="reveal-hint" data-secret="${s.id}" data-tier="2">
              ${unlockedHintTier >= 2 ? 'Hint 2 (Direction)' : 'Unlock Hint 2'}
            </button>
            <button class="btn-hint ${unlockedHintTier >= 3 ? 'revealed' : ''}" data-action="reveal-hint" data-secret="${s.id}" data-tier="3">
              ${unlockedHintTier >= 3 ? 'Hint 3 (Clue)' : 'Unlock Hint 3'}
            </button>
          </div>

          ${unlockedHintTier >= 1 ? `
            <div class="hint-box">
              <div class="hint-tier-label">HINT 1:</div>
              <div class="hint-tier-text">${s.hints[0]}</div>
            </div>
          ` : ''}
          ${unlockedHintTier >= 2 ? `
            <div class="hint-box">
              <div class="hint-tier-label">HINT 2:</div>
              <div class="hint-tier-text">${s.hints[1]}</div>
            </div>
          ` : ''}
          ${unlockedHintTier >= 3 ? `
            <div class="hint-box">
              <div class="hint-tier-label">HINT 3:</div>
              <div class="hint-tier-text">${s.hints[2]}</div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  };

  const renderCoreTab = () => {
    const coreSecrets = Object.values(CORE_SECRETS);
    const discoveredCore = coreSecrets.filter(s => state.discoveredSecrets.has(s.id));

    return `
      <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px; display: flex; justify-content: space-between;">
        <span>Core Discoveries Progress: <strong>${discoveredCore.length} / 30</strong></span>
        <span style="color: var(--text-muted);">Tier 1 through Tier 5 Challenges</span>
      </div>

      <div class="journal-list">
        ${coreSecrets.map(s => {
          const isUnlocked = state.discoveredSecrets.has(s.id);
          const timestamp = state.discoveryTimestamps[s.id] ? new Date(state.discoveryTimestamps[s.id]).toLocaleString() : 'Verified';

          if (isUnlocked) {
            return `
              <div class="journal-entry">
                <div class="journal-entry-header">
                  <div class="journal-entry-title">${s.title}</div>
                  <span class="journal-entry-tier">${s.difficulty} Tier • +1 Pt</span>
                </div>
                <div class="journal-entry-desc">${s.description}</div>
                <div class="journal-entry-timestamp">Discovered: ${timestamp}</div>
              </div>
            `;
          }

          return `
            <div class="journal-entry" style="opacity: 0.4; border-style: dashed;">
              <div class="journal-entry-header">
                <div class="journal-entry-title" style="font-family: var(--font-mono); color: var(--text-muted);">[ENCRYPTED DISCOVERY]</div>
                <span class="journal-entry-tier" style="background: transparent; color: var(--text-muted); border: 1px solid var(--border-subtle);">Classified</span>
              </div>
              <div class="journal-entry-desc" style="color: var(--text-muted);">
                Awaiting investigation by a developer.
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  };

  const attachListeners = (progress) => {
    const el = win.contentElement;

    // Tab buttons
    const btnArch = el.querySelector('#btn-tab-architect');
    if (btnArch) {
      btnArch.addEventListener('click', () => {
        activeTab = 'architect';
        render();
      });
    }

    const btnCore = el.querySelector('#btn-tab-core');
    if (btnCore) {
      btnCore.addEventListener('click', () => {
        activeTab = 'core';
        render();
      });
    }

    // Category pills
    el.querySelectorAll('.cat-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedCategory = btn.getAttribute('data-cat');
        render();
      });
    });

    // Reveal hints
    el.querySelectorAll('[data-action="reveal-hint"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const secretId = btn.getAttribute('data-secret');
        const tier = parseInt(btn.getAttribute('data-tier'), 10);
        architectRegistry.revealHintTier(secretId, tier);
        render();
      });
    });

    // Open leaderboard
    const btnLb = el.querySelector('#btn-open-lb-from-j');
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
