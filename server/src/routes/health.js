import { Router } from 'express';
import { hasGeminiKey } from '../config/env.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    success: true,
    service: 'Guardian AI API',
    version: '1.0.0',
    geminiConfigured: hasGeminiKey,
    timestamp: new Date().toISOString(),
  });
});

export default router;
