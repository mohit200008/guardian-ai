import { TRUST_LEVELS } from '../config/constants.js';

export function getTrustLevel(score) {
  if (score >= 80) return TRUST_LEVELS.SAFE;
  if (score >= 50) return TRUST_LEVELS.CAUTION;
  if (score >= 20) return TRUST_LEVELS.HIGH_RISK;
  return TRUST_LEVELS.DANGER;
}

export function normalizeAnalysis(raw, type) {
  const score = Math.min(100, Math.max(0, Number(raw.trustScore) || 0));
  const level = getTrustLevel(score);

  return {
    type,
    trustScore: score,
    riskLevel: raw.riskLevel ?? level.label.toLowerCase().replace(' ', '_'),
    trustLabel: level.label,
    threats: raw.threats ?? [],
    redFlags: raw.redFlags ?? [],
    explanation: raw.explanation ?? 'Analysis complete.',
    recoverySteps: raw.recoverySteps ?? [],
    confidence: raw.confidence ?? 75,
    domainAnalysis: raw.domainAnalysis ?? null,
    analyzedAt: new Date().toISOString(),
  };
}
