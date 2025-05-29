import { Router } from 'express';

import { login, logout, refresh, register } from './auth.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router: Router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.post('/refresh', refresh);

export default router;
