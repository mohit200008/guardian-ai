import { GoogleGenerativeAI } from '@google/generative-ai';
import { env, hasGeminiKey } from '../config/env.js';
import { GEMINI_MODEL } from '../config/constants.js';
import { AppError } from '../middleware/errorHandler.js';

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
      'Gemini API key not configured. Add GEMINI_API_KEY to server/.env',
      503,
      'GEMINI_NOT_CONFIGURED'
    );
  }

  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.2,
    },
    systemInstruction: systemPrompt,
  });

  try {
    const result = await model.generateContent(userPrompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (err) {
    if (err instanceof AppError) throw err;
    console.error('Gemini error:', err.message);
    throw new AppError('AI analysis failed. Please try again.', 502, 'GEMINI_ERROR');
  }
}
