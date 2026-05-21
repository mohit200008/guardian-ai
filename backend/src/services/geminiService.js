import { GoogleGenerativeAI } from '@google/generative-ai';
import { env, hasGeminiKey } from '../config/env.js';
import { DEFAULT_GEMINI_MODEL } from '../config/constants.js';
import { AppError } from '../middleware/errorHandler.js';
import { parseGeminiJson } from '../utils/parseGeminiJson.js';

/**
 * Gemini API integration layer.
 * Set GEMINI_API_KEY in backend/.env to enable live analysis.
 */
let client = null;

function getClient() {
  if (!hasGeminiKey) return null;
  if (!client) {
    client = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  }
  return client;
}

export async function generateJson({ systemPrompt, userPrompt }) {
  const genAI = getClient();

  if (!genAI) {
    throw new AppError(
      'Gemini API key not configured. Add GEMINI_API_KEY to backend/.env',
      503,
      'GEMINI_NOT_CONFIGURED'
    );
  }

  const modelId = env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL;

  const model = genAI.getGenerativeModel({
    model: modelId,
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.2,
    },
    systemInstruction: systemPrompt,
  });

  try {
    const result = await model.generateContent(userPrompt);
    const text = result.response.text();
    try {
      return parseGeminiJson(text);
    } catch (parseErr) {
      console.error('Gemini JSON parse error:', parseErr.message, text?.slice(0, 200));
      throw new AppError(
        'AI returned an invalid response. Please try again.',
        502,
        'GEMINI_PARSE_ERROR'
      );
    }
  } catch (err) {
    if (err instanceof AppError) throw err;
    const msg = err.message ?? '';
    console.error('Gemini error:', msg);

    if (msg.includes('API_KEY_INVALID') || msg.includes('API key not valid')) {
      throw new AppError(
        'Invalid Gemini API key. Check GEMINI_API_KEY in backend/.env',
        401,
        'GEMINI_INVALID_KEY'
      );
    }
    if (msg.includes('429') || msg.includes('quota')) {
      throw new AppError(
        'Gemini quota exceeded. Wait a minute or set GEMINI_MODEL=gemini-1.5-flash in backend/.env',
        429,
        'GEMINI_QUOTA'
      );
    }

    throw new AppError('AI analysis failed. Please try again.', 502, 'GEMINI_ERROR');
  }
}

export function isGeminiConfigured() {
  return hasGeminiKey;
}
