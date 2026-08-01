import { Router } from 'express';
import authRoutes from './auth.routes.js';
    
router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);

const router = Router();

export default router;
