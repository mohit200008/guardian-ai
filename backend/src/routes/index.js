import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import analyzeRoutes from './analyzeRoutes.js';
import threatsRoutes from './threatsRoutes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/analyze', analyzeRoutes);
router.use('/threats', threatsRoutes);

export default router;
