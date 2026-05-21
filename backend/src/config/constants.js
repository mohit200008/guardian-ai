// Overridden by GEMINI_MODEL in backend/.env (gemini-1.5-flash works on most free tiers)
export const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash';

export const TRUST_LEVELS = {
  SAFE: { min: 80, label: 'Safe' },
  CAUTION: { min: 50, label: 'Caution' },
  HIGH_RISK: { min: 20, label: 'High Risk' },
  DANGER: { min: 0, label: 'Danger' },
};
