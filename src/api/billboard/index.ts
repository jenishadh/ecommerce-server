import { Router } from 'express';

import * as Controller from './billboard.controller';

import { authMiddleware } from '../../middlewares/auth.middleware';
import { upload } from '../../middlewares/multer.middleware';

const storeBillboardRouter: Router = Router();

storeBillboardRouter.post(
  '/:storeId/billboards',
  authMiddleware,
  upload.single('image'),
  Controller.createBillboard
);
storeBillboardRouter.get(
  '/:storeId/billboards',
  authMiddleware,
  Controller.getBillboards
);

const billboardRouter: Router = Router();

billboardRouter.get('/:billboardId', authMiddleware, Controller.getBillboard);
billboardRouter.patch(
  '/:billboardId',
  authMiddleware,
  upload.single('image'),
  Controller.updateBillboard
);
billboardRouter.delete(
  '/:billboardId',
  authMiddleware,
  Controller.deleteBillboard
);

export { storeBillboardRouter, billboardRouter };
