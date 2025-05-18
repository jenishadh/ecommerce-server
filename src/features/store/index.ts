import { Router } from 'express';

import {
  createStore,
  deleteStore,
  getStore,
  getStores,
  updateStore,
} from './store.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router: Router = Router();

router.post('/', authMiddleware, createStore);
router.get('/', authMiddleware, getStores);
router.get('/:storeId', authMiddleware, getStore);
router.patch('/:storeId', authMiddleware, updateStore);
router.delete('/:storeId', authMiddleware, deleteStore);

export default router;
