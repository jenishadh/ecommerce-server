import { Router } from 'express';

import {
  createSize,
  deleteSize,
  getSize,
  getSizes,
  updateSize,
} from './size.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const sizesRoutes: Router = Router();

sizesRoutes.post('/:storeId/sizes', authMiddleware, createSize);
sizesRoutes.get('/:storeId/sizes', authMiddleware, getSizes);

const sizeRoutes: Router = Router();

sizeRoutes.get('/:sizeId', authMiddleware, getSize);
sizeRoutes.patch('/:sizeId', authMiddleware, updateSize);
sizeRoutes.delete('/:sizeId', authMiddleware, deleteSize);

export { sizesRoutes, sizeRoutes };
