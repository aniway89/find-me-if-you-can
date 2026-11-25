/**
 * Find Me If You Can — Centralized Architect+ Registry & Progression System
 */

import { ARCHITECT_SECRETS, ARCHITECT_CATEGORIES } from './architect-secrets-data.js';
import { CORE_SECRETS } from './secret-definitions.js';
import { state } from '../core/state.js';

class ArchitectRegistry {
  constructor() {
    this.categories = ARCHITECT_CATEGORIES;
    this.secrets = ARCHITECT_SECRETS;
    this.puzzleStateKey = 'phantom_architect_puzzle_state';
    this.unlockedHintsKey = 'phantom_unlocked_hints';
  }

  getSecret(id) {
    return this.secrets[id] || CORE_SECRETS[id] || null;
  }

  getAllSecrets() {
    return { ...CORE_SECRETS, ...this.secrets };
  }

  getArchitectSecrets() {
    return this.secrets;
  }

  getCategories() {
    return this.categories;
  }

  getCategorySecrets(catId) {
    return Object.values(this.secrets).filter(s => s.categoryId === catId);
  }

  getHints(secretId) {
    const s = this.getSecret(secretId);
    if (!s || !s.hints) return [];
    return s.hints;
  }

  // Multi-step puzzle progress tracker (persists across refreshes)
  getPuzzleState(puzzleId) {
    try {
      const raw = localStorage.getItem(this.puzzleStateKey);
      if (raw) {
        const obj = JSON.parse(raw);
        return obj[puzzleId] || null;
      }
    } catch (_) {}
    return null;
  }

  setPuzzleState(puzzleId, val) {
    try {
      const raw = localStorage.getItem(this.puzzleStateKey);
      const obj = raw ? JSON.parse(raw) : {};
      obj[puzzleId] = {
        ...obj[puzzleId],
        ...val,
        updatedAt: Date.now()
      };
      localStorage.setItem(this.puzzleStateKey, JSON.stringify(obj));
    } catch (_) {}
  }

  // Track player hint view levels (doesn't grant points, just tracks unlocked hint tier)
  getHintTierUnlocked(secretId) {
    try {
      const raw = localStorage.getItem(this.unlockedHintsKey);
      if (raw) {
        const obj = JSON.parse(raw);
        return obj[secretId] || 0;
      }
    } catch (_) {}
    return 0;
  }

  revealHintTier(secretId, tier) {
    try {
      const raw = localStorage.getItem(this.unlockedHintsKey);
      const obj = raw ? JSON.parse(raw) : {};
      const current = obj[secretId] || 0;
      if (tier > current) {
        obj[secretId] = tier;
        localStorage.setItem(this.unlockedHintsKey, JSON.stringify(obj));
      }
      return obj[secretId];
    } catch (_) {
      return tier;
    }
  }

  // Statistical calculations
  getProgress() {
    const discovered = state.discoveredSecrets;
    const architectList = Object.keys(this.secrets);
    const architectDiscovered = architectList.filter(id => discovered.has(id));

    const categoryStats = this.categories.map(cat => {
      const catSecrets = this.getCategorySecrets(cat.id);
      const solved = catSecrets.filter(s => discovered.has(s.id));
      return {
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        total: catSecrets.length,
        solved: solved.length,
        percentage: Math.round((solved.length / (catSecrets.length || 1)) * 100),
        isComplete: solved.length === catSecrets.length
      };
    });

    return {
      totalSecrets: 130,
      totalDiscovered: discovered.size,
      architectTotal: 100,
      architectDiscovered: architectDiscovered.length,
      architectPercentage: Math.round((architectDiscovered.length / 100) * 100),
      isArchitectComplete: architectDiscovered.length === 100,
      categoryStats
    };
  }
}

export const architectRegistry = new ArchitectRegistry();
