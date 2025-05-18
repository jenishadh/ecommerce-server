import { Router } from 'express';

import {
  createColor,
  deleteColor,
  getColor,
  getColors,
  updateColor,
} from './color.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const colorsRoutes: Router = Router();

colorsRoutes.post('/:storeId/colors', authMiddleware, createColor);
colorsRoutes.get('/:storeId/colors', authMiddleware, getColors);

const colorRoutes: Router = Router();

colorRoutes.get('/:colorId', authMiddleware, getColor);
colorRoutes.patch('/:colorId', authMiddleware, updateColor);
colorRoutes.delete('/:colorId', authMiddleware, deleteColor);

export { colorsRoutes, colorRoutes };
