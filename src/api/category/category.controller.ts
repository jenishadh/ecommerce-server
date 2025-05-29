import { Request, Response } from 'express';

import {
  createCategoryQuery,
  deleteCategoryQuery,
  getCategoriesQuery,
  getCategoryQuery,
  updateCategoryQuery,
} from './category.queries';
import { getStoreQuery } from '../store/store.queries';
import { asyncHandler } from '../../lib/async-handler';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../../lib/api-error';
import { categoryIdSchema, nameSchema, storeIdSchema } from './category.schema';

// POST /api/v1/stores/:storeId/categories - Create new category
export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
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

    const store = await getStoreQuery(userId, storeId.data);
    if (!store) {
      throw new NotFoundError('Store not found!');
    }

    const category = await createCategoryQuery(name.data, store.id);

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
  async (req: Request, res: Response) => {
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

    const categories = await getCategoriesQuery(userId, store.id);

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
export const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new UnauthorizedError(
      'Authentication failed! Please log in to continue.'
    );
  }

  const categoryId = categoryIdSchema.safeParse(req.params.categoryId);
  if (!categoryId.success) {
    throw new BadRequestError(categoryId.error?.errors[0]?.message);
  }

  const category = await getCategoryQuery(userId, categoryId.data);
  if (!category) {
    throw new NotFoundError('Category not found!');
  }

  res.status(200).json({
    success: true,
    data: {
      message: 'Category fetched successfully!',
      category: category,
    },
  });
});

// PATCH /api/v1/categories/:categoryId - Update category
export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedError(
        'Authentication failed! Please log in to continue.'
      );
    }

    const categoryId = categoryIdSchema.safeParse(req.params.categoryId);
    if (!categoryId.success) {
      throw new BadRequestError(categoryId.error?.errors[0]?.message);
    }

    const name = nameSchema.safeParse(req.body.name);
    if (!name.success) {
      throw new BadRequestError(name.error?.errors[0]?.message);
    }

    const existingCategory = await getCategoryQuery(userId, categoryId.data);
    if (!existingCategory) {
      throw new NotFoundError('Category not found!');
    }

    const category = await updateCategoryQuery(
      userId,
      existingCategory.id,
      name.data
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
  async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedError(
        'Authentication failed! Please log in to continue.'
      );
    }

    const categoryId = categoryIdSchema.safeParse(req.params.categoryId);
    if (!categoryId.success) {
      throw new BadRequestError(categoryId.error?.errors[0]?.message);
    }

    const existingCategory = await getCategoryQuery(userId, categoryId.data);
    if (!existingCategory) {
      throw new NotFoundError('Category not found!');
    }

    const category = await deleteCategoryQuery(userId, existingCategory.id);

    res.status(200).json({
      success: true,
      data: {
        message: 'Category deleted successfully!',
        category: category,
      },
    });
  }
);
