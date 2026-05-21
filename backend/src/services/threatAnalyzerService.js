import { generateJson } from './geminiService.js';
import { normalizeAnalysis } from '../utils/trustLevel.js';
import {
  SCAM_MESSAGE_SYSTEM,
  buildScamMessagePrompt,
} from '../utils/prompts/scamMessage.js';
import { URL_TRUST_SYSTEM, buildUrlTrustPrompt } from '../utils/prompts/urlTrust.js';

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
