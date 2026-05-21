/** Display tiers for hackathon UI */
export const RISK_TIERS = {
  safe: {
    label: 'Safe',
    min: 80,
    color: 'text-emerald-400',
    stroke: '#34d399',
    glow: 'rgba(52, 211, 153, 0.4)',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    ring: 'ring-emerald-500/30',
  },
  suspicious: {
    label: 'Suspicious',
    min: 50,
    color: 'text-amber-400',
    stroke: '#fbbf24',
    glow: 'rgba(251, 191, 36, 0.35)',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    ring: 'ring-amber-500/30',
  },
  dangerous: {
    label: 'Dangerous',
    min: 20,
    color: 'text-orange-400',
    stroke: '#fb923c',
    glow: 'rgba(251, 146, 60, 0.4)',
    badge: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    ring: 'ring-orange-500/30',
  },
  critical: {
    label: 'Critical',
    min: 0,
    color: 'text-red-400',
    stroke: '#f87171',
    glow: 'rgba(248, 113, 113, 0.5)',
    badge: 'bg-red-500/20 text-red-300 border-red-500/40',
    ring: 'ring-red-500/40',
  },
};

export function getRiskTier(score) {
  if (score >= 80) return RISK_TIERS.safe;
  if (score >= 50) return RISK_TIERS.suspicious;
  if (score >= 20) return RISK_TIERS.dangerous;
  return RISK_TIERS.critical;
}

export function getRiskTierKey(score) {
  if (score >= 80) return 'safe';
  if (score >= 50) return 'suspicious';
  if (score >= 20) return 'dangerous';
  return 'critical';
}

export function mapApiRiskLevel(riskLevel) {
  const map = {
    safe: 'safe',
    caution: 'suspicious',
    high_risk: 'dangerous',
    danger: 'critical',
  };
  return map[riskLevel] ?? 'suspicious';
}

export function getScoreColor(score) {
  return getRiskTier(score).color;
}

export function getScoreStroke(score) {
  return getRiskTier(score).stroke;
}

export function getRiskBadgeClass(riskLevel) {
  const key = mapApiRiskLevel(riskLevel);
  return RISK_TIERS[key]?.badge ?? RISK_TIERS.suspicious.badge;
}

export function isCriticalRisk(score) {
  return score < 20;
}
