import { Router } from 'express';

import {
  createBillboard,
  deleteBillboard,
  getBillboard,
  getBillboards,
  updateBillboard,
} from './billboard.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const billboardsRoutes: Router = Router();

billboardsRoutes.post('/:id/billboards', authMiddleware, createBillboard);
billboardsRoutes.get('/:id/billboards', authMiddleware, getBillboards);

const billboardRoutes: Router = Router();

billboardRoutes.get('/:id', authMiddleware, getBillboard);
billboardRoutes.patch('/:id', authMiddleware, updateBillboard);
billboardRoutes.delete('/:id', authMiddleware, deleteBillboard);

export { billboardsRoutes, billboardRoutes };
