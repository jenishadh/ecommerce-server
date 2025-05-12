import { Router } from 'express';
import { healthcheck } from './healthcheck.handlers';

const router: Router = Router();

router.get('/', healthcheck);

export default router;
