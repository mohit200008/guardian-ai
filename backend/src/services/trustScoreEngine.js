import { getTrustLevel } from '../utils/trustLevel.js';

/**
 * Hybrid trust score: Gemini reasoning + deterministic threat intelligence.
 */
export function computeHybridTrustScore({
  geminiScore,
  manipulation = null,
  urlIntel = null,
  messageIntel = null,
  type,
}) {
  const factors = [];

  const geminiTrust = Math.min(100, Math.max(0, Number(geminiScore) || 50));
  factors.push({
    id: 'ai_analysis',
    label: 'AI threat assessment',
    impact: geminiTrust,
    weight: 0.4,
  });

  let manipulationTrust = 75;
  if (manipulation) {
    manipulationTrust = Math.max(0, 100 - manipulation.tacticScore);
    factors.push({
      id: 'manipulation',
      label: 'Manipulation pattern engine',
      impact: manipulationTrust,
      weight: 0.25,
      detail: `${manipulation.detectedTactics.length} tactic(s), ${manipulation.matchedKeywords.length} keyword(s)`,
    });
  }

  let intelTrust = 70;
  if (type === 'message' && messageIntel) {
    intelTrust = Math.max(0, 100 - messageIntel.corpusMatchScore * 0.6);
    factors.push({
      id: 'corpus_match',
      label: 'Threat intelligence corpus',
      impact: intelTrust,
      weight: 0.2,
      detail: messageIntel.scamCategory,
    });
  }

  if (type === 'url' && urlIntel) {
    intelTrust = Math.max(0, 100 - urlIntel.riskScore);
    factors.push({
      id: 'url_intel',
      label: 'Phishing URL indicators',
      impact: intelTrust,
      weight: 0.25,
      detail: `${urlIntel.matchedPatterns.length} pattern(s)`,
    });
  }

  let keywordTrust = 80;
  if (manipulation?.keywordDensity != null) {
    keywordTrust = Math.max(0, 100 - manipulation.keywordDensity * 12);
    factors.push({
      id: 'keyword_density',
      label: 'Suspicious keyword density',
      impact: keywordTrust,
      weight: 0.15,
    });
  }

  const weights =
    type === 'url'
      ? { gemini: 0.35, manipulation: 0, intel: 0.35, keyword: 0.1, urlExtra: 0.2 }
      : { gemini: 0.4, manipulation: 0.25, intel: 0.2, keyword: 0.15, urlExtra: 0 };

  let hybrid =
    geminiTrust * weights.gemini +
    manipulationTrust * (weights.manipulation || 0) +
    intelTrust * (weights.intel + (type === 'url' ? weights.urlExtra : 0)) +
    keywordTrust * weights.keyword;

  if (type === 'url' && urlIntel) {
    hybrid = geminiTrust * 0.35 + intelTrust * 0.4 + (100 - urlIntel.riskScore) * 0.25;
  }

  hybrid = Math.round(Math.min(100, Math.max(0, hybrid)));
  const level = getTrustLevel(hybrid);

  const intelConfidence =
    type === 'message'
      ? (messageIntel?.intelligenceConfidence ?? 70)
      : (messageIntel?.intelligenceConfidence ?? Math.min(92, 50 + (urlIntel?.riskScore ?? 0) * 0.45));

  return {
    trustScore: hybrid,
    trustLabel: level.label,
    riskLevel: level.label.toLowerCase().replace(' ', '_'),
    riskFactors: factors,
    intelligenceConfidence: Math.round(
      (intelConfidence + (100 - Math.abs(geminiTrust - hybrid))) / 2
    ),
    scoringMethod: 'hybrid_gemini_threat_intel',
  };
}
