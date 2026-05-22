import { isGeminiConfigured } from '../services/geminiService.js';
import { env } from '../config/env.js';
import { serverStartedAt } from '../config/runtime.js';

function formatUptime(ms) {
  const sec = Math.floor(ms / 1000);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export function getHealth(_req, res) {
  const uptimeMs = Date.now() - serverStartedAt;

  res.json({
    status: 'ok',
    success: true,
    service: 'Guardian AI API',
    version: '1.0.0',
    environment: env.NODE_ENV,
    uptime: formatUptime(uptimeMs),
    uptimeMs,
    geminiConfigured: isGeminiConfigured(),
    timestamp: new Date().toISOString(),
  });
}
