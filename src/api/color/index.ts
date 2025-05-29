import { Router } from 'express';

import * as Controller from './color.controller';

import { authMiddleware } from '../../middlewares/auth.middleware';

const storeColorRouter: Router = Router();

storeColorRouter.post(
  '/:storeId/colors',
  authMiddleware,
  Controller.createColor
);
storeColorRouter.get('/:storeId/colors', authMiddleware, Controller.getColors);

const colorRouter: Router = Router();

colorRouter.get('/:colorId', authMiddleware, Controller.getColor);
colorRouter.patch('/:colorId', authMiddleware, Controller.updateColor);
colorRouter.delete('/:colorId', authMiddleware, Controller.deleteColor);

export { storeColorRouter, colorRouter };
