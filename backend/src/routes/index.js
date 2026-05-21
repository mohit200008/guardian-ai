import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import analyzeRoutes from './analyzeRoutes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/analyze', analyzeRoutes);

export default router;
