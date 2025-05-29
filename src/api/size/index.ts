import { Router } from 'express';

import * as Controller from './size.controller';

import { authMiddleware } from '../../middlewares/auth.middleware';

const storeSizeRouter: Router = Router();

storeSizeRouter.post('/:storeId/sizes', authMiddleware, Controller.createSize);
storeSizeRouter.get('/:storeId/sizes', authMiddleware, Controller.getSizes);

const sizeRouter: Router = Router();

sizeRouter.get('/:sizeId', authMiddleware, Controller.getSize);
sizeRouter.patch('/:sizeId', authMiddleware, Controller.updateSize);
sizeRouter.delete('/:sizeId', authMiddleware, Controller.deleteSize);

export { storeSizeRouter, sizeRouter };
