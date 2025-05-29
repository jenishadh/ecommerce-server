import { Request, Response } from 'express';

import {
  createSizeQuery,
  deleteSizeQuery,
  getSizesQuery,
  getSizeQuery,
  updateSizeQuery,
} from './size.queries';
import { getStoreQuery } from '../store/store.queries';
import { asyncHandler } from '../../lib/async-handler';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../../lib/api-error';
import { nameSchema, sizeIdSchema, storeIdSchema } from './size.schema';

// POST /api/v1/stores/:storeId/sizes - Create new size
export const createSize = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new UnauthorizedError(
      'Authentication failed! Please log in to continue.'
    );
  }

  const storeId = storeIdSchema.safeParse(req.params.storeId);
  if (!storeId.success) {
    throw new BadRequestError(storeId.error?.errors[0]?.message);
  }

  const name = nameSchema.safeParse(req.body.name);
  if (!name.success) {
    throw new BadRequestError(name.error?.errors[0]?.message);
  }

  const value = nameSchema.safeParse(req.body.value);
  if (!value.success) {
    throw new BadRequestError(value.error?.errors[0]?.message);
  }

  const store = await getStoreQuery(userId, storeId.data);
  if (!store) {
    throw new NotFoundError('Store not found!');
  }

  const size = await createSizeQuery(name.data, value.data, store.id);

  res.status(201).json({
    success: true,
    data: {
      message: 'Size created successfully!',
      size: size,
    },
  });
});

// GET /api/v1/stores/:id/sizes - Get all sizes
export const getSizes = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new UnauthorizedError(
      'Authentication failed! Please log in to continue.'
    );
  }

  const storeId = storeIdSchema.safeParse(req.params.storeId);
  if (!storeId.success) {
    throw new BadRequestError(storeId.error?.errors[0]?.message);
  }

  const store = await getStoreQuery(userId, storeId.data);
  if (!store) {
    throw new NotFoundError('Store not found!');
  }

  const sizes = await getSizesQuery(userId, store.id);

  res.status(200).json({
    success: true,
    data: {
      message: 'Sizes fetched successfully!',
      sizes: sizes,
    },
  });
});

// GET /api/v1/sizes/:sizeId - Get size
export const getSize = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new UnauthorizedError(
      'Authentication failed! Please log in to continue.'
    );
  }

  const sizeId = sizeIdSchema.safeParse(req.params.sizeId);
  if (!sizeId.success) {
    throw new BadRequestError(sizeId.error?.errors[0]?.message);
  }

  const size = await getSizeQuery(userId, sizeId.data);
  if (!size) {
    throw new NotFoundError('Size not found!');
  }

  res.status(200).json({
    success: true,
    data: {
      message: 'Size fetched successfully!',
      size: size,
    },
  });
});

// PATCH /api/v1/sizes/:id - Update size
export const updateSize = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new UnauthorizedError(
      'Authentication failed! Please log in to continue.'
    );
  }

  const sizeId = sizeIdSchema.safeParse(req.params.storeId);
  if (!sizeId.success) {
    throw new BadRequestError(sizeId.error?.errors[0]?.message);
  }

  const name = nameSchema.safeParse(req.body.name);
  if (!name.success) {
    throw new BadRequestError(name.error?.errors[0]?.message);
  }

  const value = nameSchema.safeParse(req.body.value);
  if (!value.success) {
    throw new BadRequestError(value.error?.errors[0]?.message);
  }

  const existingSize = await getSizeQuery(userId, sizeId.data);
  if (!existingSize) {
    throw new NotFoundError('Size not found!');
  }

  const size = await updateSizeQuery(
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
});

// DELETE /api/v1/sizes/:id - Delete size
export const deleteSize = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new UnauthorizedError(
      'Authentication failed! Please log in to continue.'
    );
  }

  const sizeId = sizeIdSchema.safeParse(req.params.storeId);
  if (!sizeId.success) {
    throw new BadRequestError(sizeId.error?.errors[0]?.message);
  }

  const existingSize = await getSizeQuery(userId, sizeId.data);
  if (!existingSize) {
    throw new NotFoundError('Size not found!');
  }

  const size = await deleteSizeQuery(userId, existingSize.id);

  res.status(200).json({
    success: true,
    data: {
      message: 'Size deleted successfully!',
      size: size,
    },
  });
});
