import { getThreatData } from '../utils/loadThreatData.js';

/**
 * Match content against curated Kaggle-inspired threat corpus for explainability.
 */
export function matchMessageThreatIntel(content, manipulationResult) {
  const { demoThreats } = getThreatData();
  const lower = content.toLowerCase();
  const insights = [];
  let bestMatch = null;
  let bestScore = 0;

  for (const threat of demoThreats.threats) {
    if (threat.type === 'url') continue;

    let score = 0;
    const kwHits = (threat.suspiciousKeywords || []).filter((kw) =>
      lower.includes(kw.toLowerCase())
    );
    score += kwHits.length * 8;

    const tacticHits = (threat.tactics || []).filter((t) =>
      manipulationResult.detectedTactics.some((d) => d.type.includes(t.split(' ')[0]) || t.includes(d.type.split(' ')[0]))
    );
    score += tacticHits.length * 10;

    if (lower.includes(threat.category.toLowerCase().split(' ')[0])) score += 5;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = threat;
    }
  }

  if (bestScore >= 12 && bestMatch) {
    insights.push(`Matches known ${bestMatch.category.toLowerCase()} patterns from threat intelligence corpus`);
    insights.push(`Similar to documented case: "${bestMatch.title}"`);
  }

  if (manipulationResult.detectedTactics.length >= 2) {
    insights.push('Multiple manipulation tactics align with SMS spam campaign structures');
  }

  if (manipulationResult.keywordDensity >= 3) {
    insights.push('High suspicious keyword density typical of phishing SMS datasets');
  }

  const spamPatternMatch = bestScore >= 8;

  return {
    scamCategory: bestMatch?.category ?? inferCategory(manipulationResult),
    matchedThreatId: bestMatch?.id ?? null,
    matchedThreatTitle: bestMatch?.title ?? null,
    insights,
    spamPatternMatch,
    corpusMatchScore: Math.min(100, bestScore * 4),
    intelligenceConfidence: Math.min(95, 55 + bestScore * 3 + manipulationResult.detectedTactics.length * 5),
  };
}

function inferCategory(manipulationResult) {
  const types = manipulationResult.detectedTactics.map((t) => t.type);
  if (types.some((t) => t.includes('Reward'))) return 'Reward Scam';
  if (types.some((t) => t.includes('Authority'))) return 'Banking Scam';
  if (types.some((t) => t.includes('Urgency'))) return 'Payment Scam';
  return 'Suspicious Message';
}

export function matchUrlThreatIntel(urlIntel) {
  const insights = [];

  if (urlIntel.riskScore >= 50) {
    insights.push('URL structure matches common credential harvesting patterns');
  }
  if (urlIntel.matchedPatterns.some((p) => p.startsWith('typosquat'))) {
    insights.push('Domain resembles brand impersonation seen in phishing URL datasets');
  }
  if (urlIntel.matchedPatterns.some((p) => p.startsWith('path:'))) {
    insights.push('Path contains known phishing URL segments (verify/login/kyc)');
  }
  if (urlIntel.urlRiskIndicators.length >= 2) {
    insights.push('Multiple independent URL risk indicators detected');
  }

  return {
    scamCategory: urlIntel.riskScore >= 60 ? 'Credential Harvesting' : 'Suspicious URL',
    insights,
    spamPatternMatch: urlIntel.riskScore >= 40,
    corpusMatchScore: urlIntel.riskScore,
    intelligenceConfidence: Math.min(92, 50 + urlIntel.riskScore * 0.4),
  };
}
