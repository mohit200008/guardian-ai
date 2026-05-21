import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import {
  postAnalyzeMessage,
  postAnalyzeUrl,
} from '../controllers/analyzeController.js';

const router = Router();

const messageSchema = z.object({
  content: z.string().min(10).max(8000),
});

const urlSchema = z.object({
  url: z.string().url().max(2048),
});

router.post('/message', validate(messageSchema), postAnalyzeMessage);
router.post('/url', validate(urlSchema), postAnalyzeUrl);

export default router;
