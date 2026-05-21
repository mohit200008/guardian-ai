export const GEMINI_MODEL = 'gemini-2.0-flash';

export const TRUST_LEVELS = {
  SAFE: { min: 80, label: 'Safe', color: 'emerald' },
  CAUTION: { min: 50, label: 'Caution', color: 'amber' },
  HIGH_RISK: { min: 20, label: 'High Risk', color: 'orange' },
  DANGER: { min: 0, label: 'Danger', color: 'red' },
};

export function getTrustLevel(score) {
  if (score >= 80) return TRUST_LEVELS.SAFE;
  if (score >= 50) return TRUST_LEVELS.CAUTION;
  if (score >= 20) return TRUST_LEVELS.HIGH_RISK;
  return TRUST_LEVELS.DANGER;
}
