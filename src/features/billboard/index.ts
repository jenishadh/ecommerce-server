import { Router } from 'express';

import {
  createBillboard,
  deleteBillboard,
  getBillboard,
  getBillboards,
  updateBillboard,
} from './billboard.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { upload } from '../../middlewares/multer.middleware';

const billboardsRoutes: Router = Router();

billboardsRoutes.post(
  '/:storeId/billboards',
  authMiddleware,
  upload.single('image'),
  createBillboard
);
billboardsRoutes.get('/:storeId/billboards', authMiddleware, getBillboards);

const billboardRoutes: Router = Router();

billboardRoutes.get('/:billboardId', authMiddleware, getBillboard);
billboardRoutes.patch(
  '/:billboardId',
  authMiddleware,
  upload.single('image'),
  updateBillboard
);
billboardRoutes.delete('/:billboardId', authMiddleware, deleteBillboard);

export { billboardsRoutes, billboardRoutes };
