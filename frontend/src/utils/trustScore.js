export function getScoreColor(score) {
  if (score >= 80) return 'text-emerald-400';
  if (score >= 50) return 'text-amber-400';
  if (score >= 20) return 'text-orange-400';
  return 'text-red-400';
}

export function getScoreStroke(score) {
  if (score >= 80) return '#34d399';
  if (score >= 50) return '#fbbf24';
  if (score >= 20) return '#fb923c';
  return '#f87171';
}

export function getRiskBadgeClass(riskLevel) {
  const map = {
    safe: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    caution: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    high_risk: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    danger: 'bg-red-500/20 text-red-300 border-red-500/30',
  };
  return map[riskLevel] ?? map.caution;
}
