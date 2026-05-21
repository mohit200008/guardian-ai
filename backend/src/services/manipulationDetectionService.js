import { getThreatData } from '../utils/loadThreatData.js';

/**
 * Lightweight pattern engine inspired by SMS spam / phishing keyword research.
 * Runs before Gemini — fast, deterministic, explainable.
 */
export function detectManipulation(text) {
  const { manipulationPatterns } = getThreatData();
  const lower = text.toLowerCase();
  const detectedTactics = [];
  const matchedKeywords = new Set();
  let tacticScore = 0;

  for (const tactic of manipulationPatterns.tactics) {
    const hits = tactic.keywords.filter((kw) => lower.includes(kw.toLowerCase()));
    if (hits.length > 0) {
      detectedTactics.push({
        type: tactic.type,
        description: `Detected ${hits.length} pattern(s) associated with ${tactic.type.toLowerCase()} in real-world spam datasets.`,
        matchedTerms: hits.slice(0, 5),
        weight: tactic.weight,
      });
      hits.forEach((h) => matchedKeywords.add(h));
      tacticScore += tactic.weight * Math.min(hits.length, 3);
    }
  }

  for (const kw of manipulationPatterns.suspiciousKeywords) {
    if (lower.includes(kw.toLowerCase())) {
      matchedKeywords.add(kw);
      tacticScore += 4;
    }
  }

  const keywordDensity = manipulationPatterns.suspiciousKeywords.filter((kw) =>
    lower.includes(kw.toLowerCase())
  ).length;

  tacticScore = Math.min(100, tacticScore + keywordDensity * 5);

  return {
    detectedTactics,
    matchedKeywords: [...matchedKeywords],
    tacticScore,
    keywordDensity,
  };
}
