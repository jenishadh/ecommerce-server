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

colorsRoutes.post('/:id/colors', authMiddleware, createColor);
colorsRoutes.get('/:id/colors', authMiddleware, getColors);

const colorRoutes: Router = Router();

colorRoutes.get('/:id', authMiddleware, getColor);
colorRoutes.patch('/:id', authMiddleware, updateColor);
colorRoutes.delete('/:id', authMiddleware, deleteColor);

export { colorsRoutes, colorRoutes };
