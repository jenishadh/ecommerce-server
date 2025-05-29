import { Router } from 'express';

import * as Controller from './category.controller';

import { authMiddleware } from '../../middlewares/auth.middleware';

const storeCategoryRouter: Router = Router();

storeCategoryRouter.post(
  '/:storeId/categories',
  authMiddleware,
  Controller.createCategory
);
storeCategoryRouter.get(
  '/:storeId/categories',
  authMiddleware,
  Controller.getCategories
);

const categoryRouter: Router = Router();

categoryRouter.get('/:categoryId', authMiddleware, Controller.getCategory);
categoryRouter.patch('/:categoryId', authMiddleware, Controller.updateCategory);
categoryRouter.delete(
  '/:categoryId',
  authMiddleware,
  Controller.deleteCategory
);

export { storeCategoryRouter, categoryRouter };
