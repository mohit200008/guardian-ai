import { isGeminiConfigured } from '../services/geminiService.js';

export function getHealth(_req, res) {
  res.json({
    success: true,
    service: 'Guardian AI API',
    version: '1.0.0',
    geminiConfigured: isGeminiConfigured(),
    timestamp: new Date().toISOString(),
  });
}
