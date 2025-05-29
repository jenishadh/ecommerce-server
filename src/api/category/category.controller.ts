import { Response } from 'express';

import * as Query from './category.queries';
import * as Schema from './category.schema';
import { getStoreById } from '../store/store.queries';

import { AuthenticatedRequest } from '../../types';
import { idSchema } from '../../schemas';
import { asyncHandler } from '../../lib/async-handler';
import { findEntity } from '../../utils/find-entity';
import { validateId, validateSchema } from '../../utils/validate';

// POST /api/v1/stores/:storeId/categories - Create new category
export const createCategory = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const storeId = validateId(idSchema('store'), req.params.storeId);

    const validatedBody = validateSchema(Schema.category, { ...req.body });
    const { name } = validatedBody;

    const store = await findEntity(userId, storeId, getStoreById, 'Store');

    const category = await Query.createCategory(name, store.id);

    res.status(201).json({
      success: true,
      data: {
        message: 'Category created successfully!',
        category: category,
      },
    });
  }
);

// GET /api/v1/stores/:storeId/categories - Get all categories
export const getCategories = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const storeId = validateId(idSchema('store'), req.params.storeId);

    const store = await findEntity(userId, storeId, getStoreById, 'Store');

    const categories = await Query.getCategoriesById(userId, store.id);

    res.status(200).json({
      success: true,
      data: {
        message: 'Categories fetched successfully!',
        categories: categories,
      },
    });
  }
);

// GET /api/v1/categories/:categoryId - Get category
export const getCategory = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const categoryId = validateId(idSchema('category'), req.params.categoryId);

    const category = findEntity(
      userId,
      categoryId,
      Query.getCategoryById,
      'Category'
    );

    res.status(200).json({
      success: true,
      data: {
        message: 'Category fetched successfully!',
        category: category,
      },
    });
  }
);

// PATCH /api/v1/categories/:categoryId - Update category
export const updateCategory = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const categoryId = validateId(idSchema('category'), req.params.categoryId);

    const validatedBody = validateSchema(Schema.category, { ...req.body });
    const { name } = validatedBody;

    const existingCategory = await findEntity(
      userId,
      categoryId,
      Query.getCategoryById,
      'Category'
    );

    const category = await Query.updateCategory(
      userId,
      existingCategory.id,
      name
    );

    res.status(200).json({
      success: true,
      data: {
        message: 'Category updated successfully!',
        category: category,
      },
    });
  }
);

// DELETE /api/v1/categories/:categoryId - Delete category
export const deleteCategory = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const categoryId = validateId(idSchema('category'), req.params.categoryId);

    const existingCategory = await findEntity(
      userId,
      categoryId,
      Query.getCategoryById,
      'Category'
    );

    const category = await Query.deleteCategory(userId, existingCategory.id);

    res.status(200).json({
      success: true,
      data: {
        message: 'Category deleted successfully!',
        category: category,
      },
    });
  }
);
