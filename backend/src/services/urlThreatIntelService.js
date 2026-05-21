import { getThreatData } from '../utils/loadThreatData.js';

/**
 * URL threat intelligence inspired by phishing URL dataset patterns.
 */
export function analyzeUrlThreatIntel(urlString) {
  const { urlThreatPatterns } = getThreatData();
  const matchedPatterns = [];
  const urlRiskIndicators = [];
  let riskScore = 0;

  let parsed;
  try {
    parsed = new URL(urlString);
  } catch {
    return {
      matchedPatterns: ['invalid-url-format'],
      urlRiskIndicators: ['Malformed or non-standard URL'],
      riskScore: 85,
      hostname: null,
    };
  }

  const host = parsed.hostname.toLowerCase();
  const full = urlString.toLowerCase();
  const path = parsed.pathname.toLowerCase();

  if (parsed.protocol !== 'https:') {
    urlRiskIndicators.push('Non-HTTPS connection');
    riskScore += 15;
  }

  for (const tld of urlThreatPatterns.riskyTlds) {
    if (host.endsWith(tld)) {
      matchedPatterns.push(`risky-tld:${tld}`);
      urlRiskIndicators.push(`Suspicious top-level domain (${tld})`);
      riskScore += 18;
    }
  }

  for (const segment of urlThreatPatterns.suspiciousPathSegments) {
    if (path.includes(segment) || full.includes(segment)) {
      matchedPatterns.push(`path:${segment}`);
      urlRiskIndicators.push(`Phishing path pattern: "${segment}"`);
      riskScore += 12;
    }
  }

  for (const sub of urlThreatPatterns.suspiciousSubdomains) {
    if (host.includes(sub)) {
      matchedPatterns.push(`subdomain:${sub}`);
      urlRiskIndicators.push(`Suspicious subdomain structure`);
      riskScore += 10;
    }
  }

  for (const { brand, patterns } of urlThreatPatterns.brandTyposquats) {
    for (const p of patterns) {
      if (host.includes(p) && !host.endsWith(`${brand}.com`)) {
        matchedPatterns.push(`typosquat:${brand}`);
        urlRiskIndicators.push(`Possible ${brand} brand impersonation (${p})`);
        riskScore += 20;
      }
    }
  }

  for (const kw of urlThreatPatterns.highRiskKeywords) {
    if (full.includes(kw)) {
      matchedPatterns.push(`keyword:${kw}`);
      riskScore += 5;
    }
  }

  for (const shortener of urlThreatPatterns.suspiciousUrlShorteners ?? []) {
    if (host === shortener || host.endsWith(`.${shortener}`)) {
      matchedPatterns.push(`url-shortener:${shortener}`);
      urlRiskIndicators.push(
        `URL shortener (${shortener}) — government fines are not paid via random short links`
      );
      riskScore += 35;
    }
  }

  if (host.split('.').length > 3) {
    urlRiskIndicators.push('Deep subdomain chain (possible redirect trap)');
    riskScore += 10;
  }

  if (!host.endsWith('.gov.in') && (full.includes('challan') || full.includes('rto') || full.includes('parivahan'))) {
    urlRiskIndicators.push('Traffic/government-themed link not on official .gov.in domain');
    riskScore += 22;
  }

  if ((host.match(/-/g) || []).length >= 3) {
    urlRiskIndicators.push('Excessive hyphens in domain (common in phishing)');
    riskScore += 8;
  }

  if (/^\d+\.\d+\.\d+\.\d+/.test(host) || /^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
    urlRiskIndicators.push('IP-based URL (high phishing correlation)');
    riskScore += 25;
  }

  if (full.includes('@')) {
    urlRiskIndicators.push('URL contains @ (credential obfuscation tactic)');
    riskScore += 20;
  }

  riskScore = Math.min(100, riskScore);

  return {
    matchedPatterns: [...new Set(matchedPatterns)],
    urlRiskIndicators: [...new Set(urlRiskIndicators)],
    riskScore,
    hostname: host,
  };
}
