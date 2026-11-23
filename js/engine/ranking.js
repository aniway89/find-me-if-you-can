export const RANKS = [
  { name: 'EXPLORER', minPoints: 0, maxPoints: 5, color: '#388bfd' },
  { name: 'INVESTIGATOR', minPoints: 6, maxPoints: 15, color: '#3fb950' },
  { name: 'ENGINEER', minPoints: 16, maxPoints: 24, color: '#d29922' },
  { name: 'HARD FIND', minPoints: 25, maxPoints: 29, color: '#f0883e' },
  { name: 'ARCHITECT', minPoints: 30, maxPoints: 30, color: '#f85149' }
];

export function getRankInfo(points) {
  const pts = Math.min(30, Math.max(0, points || 0));
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (pts >= RANKS[i].minPoints) {
      return RANKS[i];
    }
  }
  return RANKS[0];
}

export function getBadgeClass(rankName) {
  switch (rankName) {
    case 'ARCHITECT': return 'badge-architect';
    case 'HARD FIND': return 'badge-hardfind';
    case 'ENGINEER': return 'badge-engineer';
    case 'INVESTIGATOR': return 'badge-investigator';
    default: return 'badge-explorer';
  }
}
