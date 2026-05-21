import { generateJson } from './geminiService.js';
import { normalizeAnalysis } from '../utils/trustLevel.js';
import {
  SCAM_MESSAGE_SYSTEM,
  buildScamMessagePrompt,
} from '../utils/prompts/scamMessage.js';
import { URL_TRUST_SYSTEM, buildUrlTrustPrompt } from '../utils/prompts/urlTrust.js';
import { detectManipulation } from './manipulationDetectionService.js';
import { analyzeUrlThreatIntel } from './urlThreatIntelService.js';
import {
  matchMessageThreatIntel,
  matchUrlThreatIntel,
} from './threatIntelMatchService.js';
import { computeHybridTrustScore } from './trustScoreEngine.js';
import {
  buildFallbackUrlAnalysis,
  buildFallbackMessageAnalysis,
} from './fallbackAnalysis.js';
import { AppError } from '../middleware/errorHandler.js';

function mergeTactics(patternTactics, aiTactics) {
  const map = new Map();
  for (const t of patternTactics) {
    map.set(t.type, {
      type: t.type,
      description: t.description,
      source: 'threat_intel',
    });
  }
  for (const t of aiTactics || []) {
    if (!map.has(t.type)) {
      map.set(t.type, { ...t, source: 'ai' });
    }
  }
  return [...map.values()];
}

function mergePhrases(patternKw, aiPhrases) {
  return [...new Set([...(aiPhrases || []), ...patternKw.slice(0, 8)])].slice(0, 10);
}

function enrichWithHybrid(base, hybrid, intel, manipulation, urlIntel = null) {
  return {
    ...base,
    trustScore: hybrid.trustScore,
    trustLabel: hybrid.trustLabel,
    riskLevel: hybrid.riskLevel,
    scamCategory: base.scamCategory || intel.scamCategory,
    intelligenceConfidence: hybrid.intelligenceConfidence,
    confidence: Math.round((base.confidence + hybrid.intelligenceConfidence) / 2),
    riskFactors: hybrid.riskFactors,
    scoringMethod: hybrid.scoringMethod,
    threatIntel: {
      insights: intel.insights,
      spamPatternMatch: intel.spamPatternMatch,
      matchedThreatTitle: intel.matchedThreatTitle,
      matchedThreatId: intel.matchedThreatId,
      corpusMatchScore: intel.corpusMatchScore,
    },
    patternEngine: {
      manipulation,
      urlIntel,
    },
  };
}

export async function analyzeMessage(content) {
  const manipulation = detectManipulation(content);
  const intel = matchMessageThreatIntel(content, manipulation);

  let raw;
  try {
    raw = await generateJson({
      systemPrompt: SCAM_MESSAGE_SYSTEM,
      userPrompt: buildScamMessagePrompt(content, { manipulation, intel }),
    });
  } catch (err) {
    if (err instanceof AppError && (err.code === 'GEMINI_QUOTA' || err.code === 'GEMINI_ERROR' || err.code === 'GEMINI_PARSE_ERROR')) {
      console.warn('Gemini unavailable for message — using threat intel fallback');
      raw = buildFallbackMessageAnalysis(content, manipulation, intel);
    } else {
      throw err;
    }
  }

  const normalized = normalizeAnalysis(raw, 'message');
  normalized.manipulationTactics = mergeTactics(
    manipulation.detectedTactics,
    normalized.manipulationTactics
  );
  normalized.highlightedPhrases = mergePhrases(
    manipulation.matchedKeywords,
    normalized.highlightedPhrases
  );
  normalized.scamCategory = normalized.scamCategory || intel.scamCategory;

  const hybrid = computeHybridTrustScore({
    geminiScore: normalized.trustScore,
    manipulation,
    messageIntel: intel,
    type: 'message',
  });

  return enrichWithHybrid(normalized, hybrid, intel, manipulation);
}

export async function analyzeUrl(url) {
  const urlIntel = analyzeUrlThreatIntel(url);
  const intel = matchUrlThreatIntel(urlIntel);
  const manipulation = detectManipulation(url);

  let raw;
  try {
    raw = await generateJson({
      systemPrompt: URL_TRUST_SYSTEM,
      userPrompt: buildUrlTrustPrompt(url, { urlIntel, intel }),
    });
  } catch (err) {
    if (err instanceof AppError && (err.code === 'GEMINI_QUOTA' || err.code === 'GEMINI_ERROR' || err.code === 'GEMINI_PARSE_ERROR')) {
      console.warn('Gemini unavailable for URL — using threat intel fallback');
      raw = buildFallbackUrlAnalysis(url, urlIntel, intel, manipulation);
    } else {
      throw err;
    }
  }

  const normalized = normalizeAnalysis(raw, 'url');
  normalized.scamCategory = normalized.scamCategory || intel.scamCategory;

  const hybrid = computeHybridTrustScore({
    geminiScore: normalized.trustScore,
    urlIntel,
    messageIntel: intel,
    type: 'url',
  });

  return enrichWithHybrid(normalized, hybrid, intel, manipulation, urlIntel);
}
