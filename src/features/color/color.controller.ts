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
  InternalError,
  NotFoundError,
  UnauthorizedError,
} from '../../lib/api-error';

// POST /api/v1/stores/:id/colors - Create new color
export const createColor = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const { name, value } = req.body;
  const storeId = req.params.id;

  if (!user?.id) {
    throw new UnauthorizedError(
      'To perform this action, authentication is required!'
    );
  }

  if (!name) {
    throw new BadRequestError('Color name is required!');
  }

  if (!value) {
    throw new BadRequestError('Color value is required!');
  }

  if (!storeId) {
    throw new BadRequestError('Store id is required!');
  }

  const storeIdByUser = await getStoreQuery(user.id, storeId);
  if (!storeIdByUser) {
    throw new UnauthorizedError('Access denied!');
  }

  const color = await createColorQuery(name, value, storeIdByUser.id);
  if (!color) {
    throw new InternalError('Failed to create color!');
  }

  res.status(201).json({
    success: true,
    data: {
      message: 'Color created successfully!',
      color: color,
    },
  });
});

// GET /api/v1/stores/:id/colors - Get all colors
export const getColors = asyncHandler(async (req: Request, res: Response) => {
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

  const colors = await getColorsQuery(user.id, storeId);

  res.status(200).json({
    success: true,
    data: {
      message: 'Colors fetched successfully!',
      colors: colors,
    },
  });
});

// GET /api/v1/colors/:id - Get color
export const getColor = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const colorId = req.params.id;

  if (!user?.id) {
    throw new UnauthorizedError(
      'To perform this action, authentication is required!'
    );
  }
  if (!colorId) {
    throw new BadRequestError('Color id is required!');
  }

  const color = await getColorQuery(user.id, colorId);
  if (!color) {
    throw new NotFoundError('Color not found!');
  }

  res.status(201).json({
    success: true,
    data: {
      message: 'Color fetched successfully!',
      color: color,
    },
  });
});

// PATCH /api/v1/colors/:id - Update color
export const updateColor = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const colorId = req.params.id;
  const { name, value } = req.body;

  if (!user?.id) {
    throw new UnauthorizedError(
      'To perform this action, authentication is required!'
    );
  }

  if (!colorId) {
    throw new BadRequestError('Color id is required!');
  }

  if (!name) {
    throw new BadRequestError('Color name is required!');
  }

  if (!value) {
    throw new BadRequestError('Color value is required!');
  }

  const color = await updateColorQuery(user.id, colorId, name, value);
  if (!color) {
    throw new NotFoundError('Color not found!');
  }

  res.status(201).json({
    success: true,
    data: {
      message: 'Color updated successfully!',
      color: color,
    },
  });
});

// DELETE /api/v1/colors/:id - Delete color
export const deleteColor = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const colorId = req.params.id;

  if (!user?.id) {
    throw new UnauthorizedError(
      'To perform this action, authentication is required!'
    );
  }
  if (!colorId) {
    throw new BadRequestError('Color id is required!');
  }

  const color = await deleteColorQuery(user.id, colorId);
  if (!color) {
    throw new NotFoundError('Color not found!');
  }

  res.status(201).json({
    success: true,
    data: {
      message: 'Color deleted successfully!',
      color: color,
    },
  });
});
