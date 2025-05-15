import { Request, Response } from 'express';

import {
  createStoreQuery,
  deleteStoreQuery,
  getStoreQuery,
  getStoresQuery,
  updateStoreQuery,
} from './store.queries';
import {
  BadRequestError,
  InternalError,
  NotFoundError,
  UnauthorizedError,
} from '../../lib/api-error';
import { asyncHandler } from '../../lib/async-handler';

// POST /api/v1/stores - Create new store
export const createStore = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const { name } = req.body;

  if (!user?.id) {
    throw new UnauthorizedError(
      'To perform this action, authentication is required!'
    );
  }

  if (!name) {
    throw new BadRequestError('Store name is required!');
  }

  const store = await createStoreQuery(user.id, name);
  if (!store) {
    throw new InternalError('Failed to create store!');
  }

  res.status(201).json({
    success: true,
    data: {
      message: 'Store created successfully!',
      store: store,
    },
  });
});

// GET /api/v1/stores - Get all stores
export const getStores = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user?.id) {
    throw new UnauthorizedError(
      'To perform this action, authentication is required!'
    );
  }

  const stores = await getStoresQuery(user.id);
  if (!stores) {
    throw new NotFoundError('Failed to fetch stores!');
  }

  res.status(200).json({
    success: true,
    data: {
      message: 'Stores fetched successfully!',
      stores: stores,
    },
  });
});

// GET /api/v1/store/:id - Get store
export const getStore = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const storeId = req.params.id;

  if (!user?.id) {
    throw new UnauthorizedError('You are not logged in!');
  }

  if (!storeId) {
    throw new BadRequestError('Store id is required!');
  }

  const store = await getStoreQuery(user.id, storeId);
  if (!store) {
    throw new NotFoundError('Store not found!');
  }

  res.status(200).json({
    success: true,
    data: {
      message: 'Store fetched successfully!',
      store: store,
    },
  });
});

// PATCH /api/v1/stores/:id - Update store
export const updateStore = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const { name } = req.body;
  const storeId = req.params.id;

  if (!user?.id) {
    throw new UnauthorizedError(
      'To perform this action, authentication is required!'
    );
  }

  if (!name) {
    throw new BadRequestError('Store name is required!');
  }

  if (!storeId) {
    throw new BadRequestError('Store id is required!');
  }

  const store = await updateStoreQuery(user.id, storeId, name);
  if (!store) {
    throw new NotFoundError('Store not found!');
  }

  res.status(200).json({
    success: true,
    data: {
      message: 'Store updated successfully!',
      store: store,
    },
  });
});

// DELETE /api/v1/stores/:id - Delete store
export const deleteStore = asyncHandler(async (req: Request, res: Response) => {
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

  const store = await deleteStoreQuery(user.id, storeId);
  if (!store) {
    throw new NotFoundError('Store not found!');
  }

  res.status(200).json({
    success: true,
    data: {
      message: 'Store deleted successfully!',
      store: store,
    },
  });
});
