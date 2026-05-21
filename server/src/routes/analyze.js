import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { analyzeMessage, analyzeUrl } from '../services/threatAnalyzer.js';

const router = Router();

const messageSchema = z.object({
  content: z.string().min(10, 'Message must be at least 10 characters').max(8000),
});

const urlSchema = z.object({
  url: z.string().url('Must be a valid URL').max(2048),
});

router.post('/message', validate(messageSchema), async (req, res, next) => {
  try {
    const { content } = req.validated;
    const result = await analyzeMessage(content);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
});

router.post('/url', validate(urlSchema), async (req, res, next) => {
  try {
    const { url } = req.validated;
    const result = await analyzeUrl(url);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
});

export default router;
