import { Router } from 'express';
import { getDemoThreats } from '../controllers/threatsController.js';

const router = Router();
router.get('/demo', getDemoThreats);
export default router;
