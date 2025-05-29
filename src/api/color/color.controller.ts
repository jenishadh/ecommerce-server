import { Response } from 'express';

import * as Query from './color.queries';
import * as Schema from './color.schema';
import { getStoreById } from '../store/store.queries';

import { AuthenticatedRequest } from '../../types';
import { idSchema } from '../../schemas';
import { asyncHandler } from '../../lib/async-handler';
import { findEntity } from '../../utils/find-entity';
import { validateId, validateSchema } from '../../utils/validate';

// POST /api/v1/stores/:storeId/colors - Create new color
export const createColor = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const storeId = validateId(idSchema('store'), req.params.storeId);

    const validatedBody = validateSchema(Schema.color, { ...req.body });
    const { name, value } = validatedBody;

    const store = await findEntity(userId, storeId, getStoreById, 'Store');

    const color = await Query.createColor(name, value, store.id);

    res.status(201).json({
      success: true,
      data: {
        message: 'Color created successfully!',
        color: color,
      },
    });
  }
);

// GET /api/v1/stores/:storeId/colors - Get all colors
export const getColors = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const storeId = validateId(idSchema('store'), req.params.storeId);

    const store = await findEntity(userId, storeId, getStoreById, 'Store');

    const colors = await Query.getColorsById(userId, store.id);

    res.status(200).json({
      success: true,
      data: {
        message: 'Colors fetched successfully!',
        colors: colors,
      },
    });
  }
);

// GET /api/v1/colors/:colorId - Get color
export const getColor = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const colorId = validateId(idSchema('color'), req.params.colorId);

    const color = await findEntity(
      userId,
      colorId,
      Query.getColorById,
      'Color'
    );

    res.status(200).json({
      success: true,
      data: {
        message: 'Color fetched successfully!',
        color: color,
      },
    });
  }
);

// PATCH /api/v1/colors/:colorId - Update color
export const updateColor = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const colorId = validateId(idSchema('color'), req.params.colorId);

    const validatedBody = validateSchema(Schema.color, { ...req.body });
    const { name, value } = validatedBody;

    const existingColor = await findEntity(
      userId,
      colorId,
      Query.getColorById,
      'Color'
    );

    const color = await Query.updateColor(
      userId,
      existingColor.id,
      name,
      value
    );

    res.status(200).json({
      success: true,
      data: {
        message: 'Color updated successfully!',
        color: color,
      },
    });
  }
);

// DELETE /api/v1/colors/:colorId - Delete color
export const deleteColor = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const colorId = validateId(idSchema('color'), req.params.colorId);

    const existingColor = await findEntity(
      userId,
      colorId,
      Query.getColorById,
      'Color'
    );

    const color = await Query.deleteColor(userId, existingColor.id);

    res.status(200).json({
      success: true,
      data: {
        message: 'Color deleted successfully!',
        color: color,
      },
    });
  }
);
