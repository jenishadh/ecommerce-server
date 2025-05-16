import { Router } from 'express';

import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategories,
  updateCategory,
} from './category.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const categoriesRoutes: Router = Router();

categoriesRoutes.post('/:id/categories', authMiddleware, createCategory);
categoriesRoutes.get('/:id/categories', authMiddleware, getCategories);

const categoryRoutes: Router = Router();

categoryRoutes.get('/:id', authMiddleware, getCategory);
categoryRoutes.patch('/:id', authMiddleware, updateCategory);
categoryRoutes.delete('/:id', authMiddleware, deleteCategory);

export { categoriesRoutes, categoryRoutes };
