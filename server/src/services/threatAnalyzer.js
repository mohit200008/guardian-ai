import { generateJson } from './gemini.js';
import { getTrustLevel } from '../config/constants.js';
import {
  SCAM_MESSAGE_SYSTEM,
  buildScamMessagePrompt,
} from '../prompts/scamMessage.js';
import { URL_TRUST_SYSTEM, buildUrlTrustPrompt } from '../prompts/urlTrust.js';

function normalizeAnalysis(raw, type) {
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

export async function analyzeMessage(content) {
  const raw = await generateJson({
    systemPrompt: SCAM_MESSAGE_SYSTEM,
    userPrompt: buildScamMessagePrompt(content),
  });
  return normalizeAnalysis(raw, 'message');
}

export async function analyzeUrl(url) {
  const raw = await generateJson({
    systemPrompt: URL_TRUST_SYSTEM,
    userPrompt: buildUrlTrustPrompt(url),
  });
  return normalizeAnalysis(raw, 'url');
}
