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

categoriesRoutes.post('/:storeId/categories', authMiddleware, createCategory);
categoriesRoutes.get('/:storeId/categories', authMiddleware, getCategories);

const categoryRoutes: Router = Router();

categoryRoutes.get('/:categoryId', authMiddleware, getCategory);
categoryRoutes.patch('/:categoryId', authMiddleware, updateCategory);
categoryRoutes.delete('/:categoryId', authMiddleware, deleteCategory);

export { categoriesRoutes, categoryRoutes };
