import { events } from './events.js';
import { getRankInfo } from '../engine/ranking.js';
import { syncLeaderboardProfile, getCurrentUid } from './firebase-service.js';

class OSState {
  constructor() {
    this.playerId = getCurrentUid();
    this.username = localStorage.getItem('phantom_username') || '';
    this.discoveredSecrets = new Set();
    this.discoveryTimestamps = {};
    this.points = 0;
    this.rank = 'EXPLORER';
    this.developerMode = false;
    this.activeWindowId = null;

    this.loadLocalState();
  }

  loadLocalState() {
    try {
      const rawSecrets = localStorage.getItem('phantom_discovered_secrets');
      if (rawSecrets) {
        const list = JSON.parse(rawSecrets);
        if (Array.isArray(list)) {
          this.discoveredSecrets = new Set(list);
          this.points = this.discoveredSecrets.size;
        }
      }

      const rawTimestamps = localStorage.getItem('phantom_discovery_timestamps');
      if (rawTimestamps) {
        this.discoveryTimestamps = JSON.parse(rawTimestamps);
      }

      const devMode = localStorage.getItem('phantom_dev_mode');
      if (devMode === 'true') {
        this.developerMode = true;
      }

      this.updateRank(false);
    } catch (_) {}
  }

  saveLocalState() {
    try {
      localStorage.setItem('phantom_discovered_secrets', JSON.stringify(Array.from(this.discoveredSecrets)));
      localStorage.setItem('phantom_discovery_timestamps', JSON.stringify(this.discoveryTimestamps));
      localStorage.setItem('phantom_username', this.username);
      localStorage.setItem('phantom_dev_mode', String(this.developerMode));
    } catch (_) {}
  }

  setUsername(name) {
    if (!name) return;
    this.username = name.trim().slice(0, 20);
    this.saveLocalState();
    events.emit('user:profile-changed', { username: this.username, rank: this.rank });
    syncLeaderboardProfile(this.username, this.points, this.rank, this.discoveredSecrets);
  }

  setDeveloperMode(enabled) {
    this.developerMode = Boolean(enabled);
    localStorage.setItem('phantom_dev_mode', String(this.developerMode));
    events.emit('system:dev-mode-changed', this.developerMode);
  }

  updateRank(triggerSync = true) {
    const info = getRankInfo(this.points);
    this.rank = info.name;
    events.emit('user:rank-changed', { rank: this.rank, points: this.points });
    if (triggerSync && this.username) {
      syncLeaderboardProfile(this.username, this.points, this.rank, this.discoveredSecrets);
    }
  }

  recordDiscovery(secretId) {
    if (this.discoveredSecrets.has(secretId)) {
      return false;
    }

    this.discoveredSecrets.add(secretId);
    this.discoveryTimestamps[secretId] = new Date().toISOString();
    this.points = this.discoveredSecrets.size;
    this.updateRank(true);
    this.saveLocalState();
    return true;
  }
}

export const state = new OSState();
