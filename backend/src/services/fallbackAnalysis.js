/**
 * Pattern-only analysis when Gemini is unavailable (quota, timeout, parse error).
 * Keeps demos working — especially URL shortener detection.
 */
export function buildFallbackUrlAnalysis(url, urlIntel, intel, manipulation) {
  const geminiScore = Math.max(5, 100 - urlIntel.riskScore - manipulation.tacticScore);

  const threats = [];
  if (urlIntel.urlRiskIndicators.length) {
    threats.push({
      type: 'URL Threat Intelligence',
      severity: urlIntel.riskScore >= 40 ? 'high' : 'medium',
      description: urlIntel.urlRiskIndicators.join('. '),
    });
  }
  if (urlIntel.matchedPatterns.some((p) => p.includes('shortener'))) {
    threats.push({
      type: 'Phishing',
      severity: 'high',
      description:
        'URL uses a link shortener — common in smishing to hide fake payment or credential-harvesting sites.',
    });
  }

  const explanation = `Threat intelligence flagged this URL as high risk (score ${urlIntel.riskScore}/100). ${
    urlIntel.urlRiskIndicators[0] ??
    'Patterns match known phishing URL structures from curated datasets.'
  } Official government payments in India use echallan.parivahan.gov.in — not short links like ${urlIntel.hostname}. AI analysis was skipped; result is based on deterministic pattern matching.`;

  return {
    trustScore: geminiScore,
    riskLevel: geminiScore < 20 ? 'danger' : geminiScore < 50 ? 'high_risk' : 'caution',
    threats,
    redFlags: urlIntel.urlRiskIndicators,
    explanation,
    recoverySteps:
      geminiScore < 50
        ? [
            'Do not open this link on your phone or computer.',
            'Verify fines only on the official Parivahan eChallan portal or app.',
            'Report the SMS to your carrier or cybercrime portal if you received it by text.',
          ]
        : [],
    confidence: 70,
    domainAnalysis: {
      domain: urlIntel.hostname,
      suspiciousPatterns: urlIntel.matchedPatterns,
      looksLike: 'Suspicious / obfuscated destination',
    },
    manipulationTactics: manipulation.detectedTactics,
    highlightedPhrases: manipulation.matchedKeywords,
    scamCategory: intel.scamCategory || 'Credential Harvesting',
    fallbackMode: true,
  };
}

export function buildFallbackMessageAnalysis(content, manipulation, intel) {
  const geminiScore = Math.max(
    5,
    100 - manipulation.tacticScore - (intel.corpusMatchScore || 0) * 0.5
  );

  return {
    trustScore: geminiScore,
    riskLevel: geminiScore < 20 ? 'danger' : geminiScore < 50 ? 'high_risk' : 'caution',
    threats: manipulation.detectedTactics.map((t) => ({
      type: t.type,
      severity: 'high',
      description: t.description,
    })),
    redFlags: manipulation.matchedKeywords,
    explanation: `Pattern engine detected ${manipulation.detectedTactics.length} manipulation tactic(s) and ${manipulation.matchedKeywords.length} suspicious keyword(s) typical of SMS spam campaigns. ${intel.insights[0] ?? ''} AI analysis was temporarily unavailable; this result uses threat intelligence rules only.`,
    recoverySteps:
      geminiScore < 50
        ? ['Do not click links in the message.', 'Verify claims through official channels.', 'Do not share OTP or payment details.']
        : [],
    confidence: 65,
    manipulationTactics: manipulation.detectedTactics,
    highlightedPhrases: manipulation.matchedKeywords,
    scamCategory: intel.scamCategory,
    fallbackMode: true,
  };
}
