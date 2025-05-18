import { Request, Response } from 'express';

import {
  createColorQuery,
  deleteColorQuery,
  getColorsQuery,
  getColorQuery,
  updateColorQuery,
} from './color.queries';
import { getStoreQuery } from '../store/store.queries';
import { asyncHandler } from '../../lib/async-handler';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../../lib/api-error';
import { colorIdSchema, nameSchema, storeIdSchema } from './color.schema';

// POST /api/v1/stores/:storeId/colors - Create new color
export const createColor = asyncHandler(async (req: Request, res: Response) => {
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

  const color = await createColorQuery(name.data, value.data, store.id);

  res.status(201).json({
    success: true,
    data: {
      message: 'Color created successfully!',
      color: color,
    },
  });
});

// GET /api/v1/stores/:storeId/colors - Get all colors
export const getColors = asyncHandler(async (req: Request, res: Response) => {
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

  const colors = await getColorsQuery(userId, store.id);

  res.status(200).json({
    success: true,
    data: {
      message: 'Colors fetched successfully!',
      colors: colors,
    },
  });
});

// GET /api/v1/colors/:colorId - Get color
export const getColor = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new UnauthorizedError(
      'Authentication failed! Please log in to continue.'
    );
  }

  const colorId = colorIdSchema.safeParse(req.params.colorId);
  if (!colorId.success) {
    throw new BadRequestError(colorId.error?.errors[0]?.message);
  }

  const color = await getColorQuery(userId, colorId.data);
  if (!color) {
    throw new NotFoundError('Color not found!');
  }

  res.status(200).json({
    success: true,
    data: {
      message: 'Color fetched successfully!',
      color: color,
    },
  });
});

// PATCH /api/v1/colors/:colorId - Update color
export const updateColor = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new UnauthorizedError(
      'Authentication failed! Please log in to continue.'
    );
  }

  const colorId = colorIdSchema.safeParse(req.params.colorId);
  if (!colorId.success) {
    throw new BadRequestError(colorId.error?.errors[0]?.message);
  }

  const name = nameSchema.safeParse(req.body.name);
  if (!name.success) {
    throw new BadRequestError(name.error?.errors[0]?.message);
  }

  const value = nameSchema.safeParse(req.body.value);
  if (!value.success) {
    throw new BadRequestError(value.error?.errors[0]?.message);
  }

  const existingColor = await getColorQuery(userId, colorId.data);
  if (!existingColor) {
    throw new NotFoundError('Color not found!');
  }

  const color = await updateColorQuery(
    userId,
    existingColor.id,
    name.data,
    value.data
  );

  res.status(200).json({
    success: true,
    data: {
      message: 'Color updated successfully!',
      color: color,
    },
  });
});

// DELETE /api/v1/colors/:colorId - Delete color
export const deleteColor = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new UnauthorizedError(
      'Authentication failed! Please log in to continue.'
    );
  }

  const colorId = colorIdSchema.safeParse(req.params.colorId);
  if (!colorId.success) {
    throw new BadRequestError(colorId.error?.errors[0]?.message);
  }

  const existingColor = await getColorQuery(userId, colorId.data);
  if (!existingColor) {
    throw new NotFoundError('Color not found!');
  }

  const color = await deleteColorQuery(userId, existingColor.id);

  res.status(200).json({
    success: true,
    data: {
      message: 'Color deleted successfully!',
      color: color,
    },
  });
});
