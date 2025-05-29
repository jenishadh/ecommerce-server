import { Router } from 'express';
import { healthcheck } from './healthcheck.controller';

const router: Router = Router();

router.get('/', healthcheck);

export default router;
