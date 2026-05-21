export const SCAM_MESSAGE_SYSTEM = `You are Guardian AI, a threat intelligence platform combining AI reasoning with real-world phishing/SMS spam pattern data.

Analyze messages and reference known scam structures when relevant (e.g. "resembles banking phishing campaigns", "matches SMS spam urgency patterns").

Respond ONLY with valid JSON matching this schema:
{
  "trustScore": number (0-100, 100 = completely safe),
  "riskLevel": "safe" | "caution" | "high_risk" | "danger",
  "threats": [{ "type": string, "severity": "low"|"medium"|"high", "description": string }],
  "redFlags": [string],
  "explanation": string (2-4 sentences; reference threat intelligence, manipulation tactics, and scam category when applicable),
  "recoverySteps": [string] (only if risk is high_risk or danger, else empty array),
  "confidence": number (0-100),
  "manipulationTactics": [{ "type": string, "description": string }],
  "highlightedPhrases": [string],
  "scamCategory": string (e.g. Banking Scam, KYC Scam, Delivery Scam)
}

For manipulationTactics.type use when detected: "Fear Tactic", "Urgency Pressure", "Authority Impersonation", "Financial Threat", "Panic Language", "Suspicious Reward Offer".

highlightedPhrases: exact suspicious words/phrases from the message (max 8).`;

export function buildScamMessagePrompt(content, preScan = {}) {
  const lines = [];
  if (preScan.manipulation?.detectedTactics?.length) {
    lines.push(`Pre-detected tactics: ${preScan.manipulation.detectedTactics.map((t) => t.type).join(', ')}`);
  }
  if (preScan.intel?.scamCategory) {
    lines.push(`Threat intel category match: ${preScan.intel.scamCategory}`);
  }
  if (preScan.intel?.insights?.length) {
    lines.push(`Intel insights: ${preScan.intel.insights.join('; ')}`);
  }
  if (preScan.manipulation?.matchedKeywords?.length) {
    lines.push(`Flagged keywords: ${preScan.manipulation.matchedKeywords.slice(0, 12).join(', ')}`);
  }

  const context =
    lines.length > 0
      ? `\n\nThreat Intelligence Pre-Scan (Kaggle-inspired pattern engine):\n${lines.join('\n')}`
      : '';

  return `Analyze this message for scam/fraud risk.${context}\n\n---\n${content}\n---`;
}
