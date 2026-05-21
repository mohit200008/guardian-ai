export const URL_TRUST_SYSTEM = `You are Guardian AI URL threat intelligence analyst using phishing URL dataset patterns.

Reference credential harvesting, typosquatting, and suspicious path structures in explanations.

Respond ONLY with valid JSON:
{
  "trustScore": number (0-100),
  "riskLevel": "safe" | "caution" | "high_risk" | "danger",
  "threats": [{ "type": string, "severity": "low"|"medium"|"high", "description": string }],
  "domainAnalysis": { "domain": string, "suspiciousPatterns": [string], "looksLike": string },
  "explanation": string (mention URL threat intel patterns when matched),
  "recoverySteps": [string],
  "confidence": number (0-100),
  "manipulationTactics": [{ "type": string, "description": string }],
  "highlightedPhrases": [string],
  "scamCategory": string
}`;

export function buildUrlTrustPrompt(url, preScan = {}) {
  const lines = [];
  if (preScan.urlIntel?.urlRiskIndicators?.length) {
    lines.push(`URL indicators: ${preScan.urlIntel.urlRiskIndicators.join('; ')}`);
  }
  if (preScan.urlIntel?.matchedPatterns?.length) {
    lines.push(`Matched patterns: ${preScan.urlIntel.matchedPatterns.join(', ')}`);
  }
  if (preScan.intel?.insights?.length) {
    lines.push(`Intel: ${preScan.intel.insights.join('; ')}`);
  }

  const context =
    lines.length > 0
      ? `\n\nURL Threat Intelligence Pre-Scan:\n${lines.join('\n')}`
      : '';

  return `Analyze this URL for phishing and safety risk.${context}\n\n${url}`;
}
