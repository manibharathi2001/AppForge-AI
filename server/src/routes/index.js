import { Router } from 'express';
import authRoutes from './auth.routes.js';
    
router.use('/auth', authRoutes);

const router = Router();

export default router;
