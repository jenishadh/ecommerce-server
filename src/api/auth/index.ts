import { Router } from 'express';

import * as Controller from './auth.controller';

import { authMiddleware } from '../../middlewares/auth.middleware';

const router: Router = Router();

router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/logout', authMiddleware, Controller.logout);
router.post('/refresh', Controller.refresh);

export default router;
