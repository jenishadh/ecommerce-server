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

sizesRoutes.post('/:id/sizes', authMiddleware, createSize);
sizesRoutes.get('/:id/sizes', authMiddleware, getSizes);

const sizeRoutes: Router = Router();

sizeRoutes.get('/:id', authMiddleware, getSize);
sizeRoutes.patch('/:id', authMiddleware, updateSize);
sizeRoutes.delete('/:id', authMiddleware, deleteSize);

export { sizesRoutes, sizeRoutes };
