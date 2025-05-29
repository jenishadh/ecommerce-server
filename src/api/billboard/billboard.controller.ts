import { Response } from 'express';

import * as Query from './billboard.queries';
import * as Schema from './billboard.schema';
import * as Error from '../../lib/api-error';
import { getStoreById } from '../store/store.queries';

import { AuthenticatedRequest } from '../../types';
import { idSchema } from '../../schemas';
import { asyncHandler } from '../../lib/async-handler';
import { uploadImage } from '../../utils/upload-image';
import { findEntity } from '../../utils/find-entity';
import { validateId, validateSchema } from '../../utils/validate';

// POST /api/v1/stores/:storeId/billboards - Create new billboard
export const createBillboard = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const storeId = validateId(idSchema('store'), req.params.storeId);

    const validatedBody = validateSchema(Schema.billboard, { ...req.body });
    const { label } = validatedBody;

    const image = req.file;
    if (!image) {
      throw new Error.BadRequestError('Billboard image is required!');
    }

    const store = await findEntity(userId, storeId, getStoreById, 'Store');

    const uploadedImage = await uploadImage(image.path);

    const billboard = await Query.createBillboard(
      store.id,
      label,
      uploadedImage.secure_url
    );

    res.status(200).json({
      success: true,
      data: {
        message: 'Billboard created successfully.',
        billboard,
      },
    });
  }
);

// GET /api/v1/stores/:storeId/billboards - get all billboards
export const getBillboards = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const storeId = validateId(idSchema('store'), req.params.storeId);

    const store = await findEntity(userId, storeId, getStoreById, 'Store');

    const billboards = await Query.getBillboardsById(userId, store.id);

    res.status(200).json({
      success: true,
      data: {
        message: 'Billboards fetched successfully!',
        billboards: billboards,
      },
    });
  }
);

// GET /api/v1/billboards/:billboardId - get billboard
export const getBillboard = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const billboardId = validateId(
      idSchema('billboard'),
      req.params.billboardId
    );

    const billboard = await findEntity(
      userId,
      billboardId,
      Query.getBillboardById,
      'Billboard'
    );

    res.status(200).json({
      success: true,
      data: {
        message: 'Billboard fetched successfully!',
        billboard: billboard,
      },
    });
  }
);

// PATCH /api/v1/billboards/:billboardId - update billboard
export const updateBillboard = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const billboardId = validateId(
      idSchema('billboard'),
      req.params.billboardId
    );

    const validatedBody = validateSchema(Schema.billboard, { ...req.body });
    const { label } = validatedBody;

    const image = req.file;
    if (!image) {
      throw new Error.BadRequestError('Billboard image is required.');
    }

    const existingBillboard = await findEntity(
      userId,
      billboardId,
      Query.getBillboardById,
      'Billboard'
    );

    const uploadedImage = await uploadImage(image.path);

    const billboard = await Query.updateBillboard(
      userId,
      existingBillboard.id,
      label,
      uploadedImage.secure_url
    );

    res.status(200).json({
      success: true,
      data: {
        message: 'Billboard updated successfully!',
        billboard: billboard,
      },
    });
  }
);

// DELETE /api/v1/billboards/:billboardId - delete billboard
export const deleteBillboard = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const billboardId = validateId(
      idSchema('billboard'),
      req.params.billboardId
    );

    const existingBillboard = await findEntity(
      userId,
      billboardId,
      Query.getBillboardById,
      'Billboard'
    );

    const billboard = await Query.deleteBillboard(userId, existingBillboard.id);

    res.status(200).json({
      success: true,
      data: {
        message: 'Billboard deleted successfully!',
        billboard: billboard,
      },
    });
  }
);
