import { Request, Response } from 'express';

import {
  createBillboardQuery,
  deleteBillboardQuery,
  getBillboardQuery,
  getBillboardsQuery,
  updateBillboardQuery,
} from './billboard.queries';
import { getStoreQuery } from '../store/store.queries';
import { asyncHandler } from '../../lib/async-handler';
import {
  BadRequestError,
  InternalError,
  NotFoundError,
  UnauthorizedError,
} from '../../lib/api-error';

// POST /api/v1/stores/:id/billboards - Create new billboard
export const createBillboard = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;
    const { label, imageUrl } = req.body;
    const storeId = req.params.id;

    if (!user?.id) {
      throw new UnauthorizedError(
        'To perform this action, authentication is required!'
      );
    }

    if (!label) {
      throw new BadRequestError('Billboard label is required!');
    }

    if (!imageUrl) {
      throw new BadRequestError('Image URL is required!');
    }

    if (!storeId) {
      throw new BadRequestError('Store id is required!');
    }

    const storeIdByUser = await getStoreQuery(user.id, storeId);
    if (!storeIdByUser) {
      throw new UnauthorizedError('Access denied!');
    }

    const billboard = await createBillboardQuery(
      storeIdByUser.id,
      label,
      imageUrl
    );
    if (!billboard) {
      throw new InternalError('Failed to create billboard!');
    }

    res.status(201).json({
      success: true,
      data: {
        message: 'Billboard created successfully!',
        billboard: billboard,
      },
    });
  }
);

// GET /api/v1/stores/:id/billboards - get all billboards
export const getBillboards = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;
    const storeId = req.params.id;

    if (!user?.id) {
      throw new UnauthorizedError(
        'To perform this action, authentication is required!'
      );
    }

    if (!storeId) {
      throw new BadRequestError('Store id is required!');
    }

    const storeIdByUser = await getStoreQuery(user.id, storeId);
    if (!storeIdByUser) {
      throw new UnauthorizedError('Access denied!');
    }

    const billboards = await getBillboardsQuery(user.id, storeId);

    res.status(200).json({
      success: true,
      data: {
        message: 'Billboards fetched successfully!',
        billboards: billboards,
      },
    });
  }
);

// GET /api/v1/billboards/:id - get billboard
export const getBillboard = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;
    const billboardId = req.params.id;

    if (!user?.id) {
      throw new UnauthorizedError(
        'To perform this action, authentication is required!'
      );
    }
    if (!billboardId) {
      throw new BadRequestError('Billboard id is required!');
    }

    const billboard = await getBillboardQuery(user.id, billboardId);
    if (!billboard) {
      throw new NotFoundError('Billboard not found!');
    }

    res.status(201).json({
      success: true,
      data: {
        message: 'Billboard fetched successfully!',
        billboard: billboard,
      },
    });
  }
);

// PATCH /api/v1/billboards/:id - update billboard
export const updateBillboard = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;
    const billboardId = req.params.id;
    const { label, imageUrl } = req.body;

    if (!user?.id) {
      throw new UnauthorizedError(
        'To perform this action, authentication is required!'
      );
    }

    if (!billboardId) {
      throw new BadRequestError('Billboard id is required!');
    }

    if (!label) {
      throw new BadRequestError('Billboard label is required!');
    }

    if (!imageUrl) {
      throw new BadRequestError('Image URL is required!');
    }

    const billboard = await updateBillboardQuery(
      user.id,
      billboardId,
      label,
      imageUrl
    );
    if (!billboard) {
      throw new NotFoundError('Billboard not found!');
    }

    res.status(201).json({
      success: true,
      data: {
        message: 'Billboard updated successfully!',
        billboard: billboard,
      },
    });
  }
);

// DELETE /api/v1/billboards/:id - delete billboard
export const deleteBillboard = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;
    const billboardId = req.params.id;

    if (!user?.id) {
      throw new UnauthorizedError('You are not logged in!');
    }
    if (!billboardId) {
      throw new BadRequestError('Billboard id is required!');
    }

    const billboard = await deleteBillboardQuery(user.id, billboardId);
    if (!billboard) {
      throw new NotFoundError('Billboard not found!');
    }

    res.status(201).json({
      success: true,
      data: {
        message: 'Billboard deleted successfully!',
        billboard: billboard,
      },
    });
  }
);
