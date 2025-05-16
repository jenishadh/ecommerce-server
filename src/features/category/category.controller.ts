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
  InternalError,
  NotFoundError,
  UnauthorizedError,
} from '../../lib/api-error';

// POST /api/v1/stores/:id/categories - Create new category
export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;
    const { name } = req.body;
    const storeId = req.params.id;

    if (!user?.id) {
      throw new UnauthorizedError(
        'To perform this action, authentication is required!'
      );
    }

    if (!name) {
      throw new BadRequestError('Category name is required!');
    }

    if (!storeId) {
      throw new BadRequestError('Store id is required!');
    }

    const storeIdByUser = await getStoreQuery(user.id, storeId);
    if (!storeIdByUser) {
      throw new UnauthorizedError('Access denied!');
    }

    const category = await createCategoryQuery(name, storeIdByUser.id);
    if (!category) {
      throw new InternalError('Failed to create category!');
    }

    res.status(201).json({
      success: true,
      data: {
        message: 'Category created successfully!',
        category: category,
      },
    });
  }
);

// GET /api/v1/stores/:id/categories - Get all categories
export const getCategories = asyncHandler(
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

    const categories = await getCategoriesQuery(user.id, storeId);

    res.status(200).json({
      success: true,
      data: {
        message: 'Categories fetched successfully!',
        categories: categories,
      },
    });
  }
);

// GET /api/v1/categories/:id - Get category
export const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const categoryId = req.params.id;

  if (!user?.id) {
    throw new UnauthorizedError(
      'To perform this action, authentication is required!'
    );
  }
  if (!categoryId) {
    throw new BadRequestError('Category id is required!');
  }

  const category = await getCategoryQuery(user.id, categoryId);
  if (!category) {
    throw new NotFoundError('Category not found!');
  }

  res.status(201).json({
    success: true,
    data: {
      message: 'Category fetched successfully!',
      category: category,
    },
  });
});

// PATCH /api/v1/categories/:id - Update category
export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;
    const categoryId = req.params.id;
    const { name } = req.body;

    if (!user?.id) {
      throw new UnauthorizedError(
        'To perform this action, authentication is required!'
      );
    }

    if (!categoryId) {
      throw new BadRequestError('Category id is required!');
    }

    if (!name) {
      throw new BadRequestError('Category name is required!');
    }

    const category = await updateCategoryQuery(user.id, categoryId, name);
    if (!category) {
      throw new NotFoundError('Category not found!');
    }

    res.status(201).json({
      success: true,
      data: {
        message: 'Category updated successfully!',
        category: category,
      },
    });
  }
);

// DELETE /api/v1/categories/:id - Delete category
export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;
    const categoryId = req.params.id;

    if (!user?.id) {
      throw new UnauthorizedError(
        'To perform this action, authentication is required!'
      );
    }
    if (!categoryId) {
      throw new BadRequestError('Category id is required!');
    }

    const category = await deleteCategoryQuery(user.id, categoryId);
    if (!category) {
      throw new NotFoundError('Category not found!');
    }

    res.status(201).json({
      success: true,
      data: {
        message: 'Category deleted successfully!',
        category: category,
      },
    });
  }
);
