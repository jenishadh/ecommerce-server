import { Router } from 'express';

import * as Controller from './store.controller';

import { authMiddleware } from '../../middlewares/auth.middleware';

const router: Router = Router();

router.post('/', authMiddleware, Controller.createStore);
router.get('/', authMiddleware, Controller.getStores);
router.get('/:storeId', authMiddleware, Controller.getStore);
router.patch('/:storeId', authMiddleware, Controller.updateStore);
router.delete('/:storeId', authMiddleware, Controller.deleteStore);

export default router;
