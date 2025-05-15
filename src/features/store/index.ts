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
router.get('/:id', authMiddleware, getStore);
router.patch('/:id', authMiddleware, updateStore);
router.delete('/:id', authMiddleware, deleteStore);

export default router;
