import { Response } from 'express';

import * as Query from './size.queries';
import * as Schema from './size.schema';
import { getStoreById } from '../store/store.queries';

import { AuthenticatedRequest } from '../../types';
import { idSchema } from '../../schemas';
import { asyncHandler } from '../../lib/async-handler';
import { findEntity } from '../../utils/find-entity';
import { validateId, validateSchema } from '../../utils/validate';

// POST /api/v1/stores/:storeId/sizes - Create new size
export const createSize = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const storeId = validateId(idSchema('store'), req.params.storeId);

    const validatedBody = validateSchema(Schema.size, { ...req.body });
    const { name, value } = validatedBody;

    const store = await findEntity(userId, storeId, getStoreById, 'Store');

    const size = await Query.createSize(name, value, store.id);

    res.status(201).json({
      success: true,
      data: {
        message: 'Size created successfully!',
        size: size,
      },
    });
  }
);

// GET /api/v1/stores/:id/sizes - Get all sizes
export const getSizes = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const storeId = validateId(idSchema('store'), req.params.storeId);

    const store = await findEntity(userId, storeId, getStoreById, 'Store');

    const sizes = await Query.getSizesById(userId, store.id);

    res.status(200).json({
      success: true,
      data: {
        message: 'Sizes fetched successfully!',
        sizes: sizes,
      },
    });
  }
);

// GET /api/v1/sizes/:sizeId - Get size
export const getSize = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const sizeId = validateId(idSchema('size'), req.params.sizeId);

    const size = await findEntity(userId, sizeId, Query.getSizeById, 'Size');

    res.status(200).json({
      success: true,
      data: {
        message: 'Size fetched successfully!',
        size: size,
      },
    });
  }
);

// PATCH /api/v1/sizes/:id - Update size
export const updateSize = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const sizeId = validateId(idSchema('size'), req.params.sizeId);

    const validatedBody = validateSchema(Schema.size, { ...req.body });
    const { name, value } = validatedBody;

    const existingSize = await findEntity(
      userId,
      sizeId,
      Query.getSizeById,
      'Size'
    );

    const size = await Query.updateSize(
      userId,
      existingSize.id,
      name.data,
      value.data
    );

    res.status(200).json({
      success: true,
      data: {
        message: 'Size updated successfully!',
        size: size,
      },
    });
  }
);

// DELETE /api/v1/sizes/:id - Delete size
export const deleteSize = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const sizeId = validateId(idSchema('size'), req.params.sizeId);

    const existingSize = await findEntity(
      userId,
      sizeId,
      Query.getSizeById,
      'Size'
    );

    const size = await Query.deleteSize(userId, existingSize.id);

    res.status(200).json({
      success: true,
      data: {
        message: 'Size deleted successfully!',
        size: size,
      },
    });
  }
);
