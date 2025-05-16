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
  InternalError,
  NotFoundError,
  UnauthorizedError,
} from '../../lib/api-error';

// POST /api/v1/stores/:id/sizes - Create new size
export const createSize = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const { name, value } = req.body;
  const storeId = req.params.id;

  if (!user?.id) {
    throw new UnauthorizedError(
      'To perform this action, authentication is required!'
    );
  }

  if (!name) {
    throw new BadRequestError('Size name is required!');
  }

  if (!value) {
    throw new BadRequestError('Size value is required!');
  }

  if (!storeId) {
    throw new BadRequestError('Store id is required!');
  }

  const storeIdByUser = await getStoreQuery(user.id, storeId);
  if (!storeIdByUser) {
    throw new UnauthorizedError('Access denied!');
  }

  const size = await createSizeQuery(name, value, storeIdByUser.id);
  if (!size) {
    throw new InternalError('Failed to create size!');
  }

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

  const sizes = await getSizesQuery(user.id, storeId);

  res.status(200).json({
    success: true,
    data: {
      message: 'Sizes fetched successfully!',
      sizes: sizes,
    },
  });
});

// GET /api/v1/sizes/:id - Get size
export const getSize = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const sizeId = req.params.id;

  if (!user?.id) {
    throw new UnauthorizedError(
      'To perform this action, authentication is required!'
    );
  }
  if (!sizeId) {
    throw new BadRequestError('Size id is required!');
  }

  const size = await getSizeQuery(user.id, sizeId);
  if (!size) {
    throw new NotFoundError('Size not found!');
  }

  res.status(201).json({
    success: true,
    data: {
      message: 'Size fetched successfully!',
      size: size,
    },
  });
});

// PATCH /api/v1/sizes/:id - Update size
export const updateSize = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const sizeId = req.params.id;
  const { name, value } = req.body;

  if (!user?.id) {
    throw new UnauthorizedError(
      'To perform this action, authentication is required!'
    );
  }

  if (!sizeId) {
    throw new BadRequestError('Size id is required!');
  }

  if (!name) {
    throw new BadRequestError('Size name is required!');
  }

  if (!value) {
    throw new BadRequestError('Size value is required!');
  }

  const size = await updateSizeQuery(user.id, sizeId, name, value);
  if (!size) {
    throw new NotFoundError('Size not found!');
  }

  res.status(201).json({
    success: true,
    data: {
      message: 'Size updated successfully!',
      size: size,
    },
  });
});

// DELETE /api/v1/sizes/:id - Delete size
export const deleteSize = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const sizeId = req.params.id;

  if (!user?.id) {
    throw new UnauthorizedError(
      'To perform this action, authentication is required!'
    );
  }
  if (!sizeId) {
    throw new BadRequestError('Size id is required!');
  }

  const size = await deleteSizeQuery(user.id, sizeId);
  if (!size) {
    throw new NotFoundError('Size not found!');
  }

  res.status(201).json({
    success: true,
    data: {
      message: 'Size deleted successfully!',
      size: size,
    },
  });
});
