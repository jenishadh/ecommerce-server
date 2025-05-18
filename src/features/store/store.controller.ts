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
  NotFoundError,
  UnauthorizedError,
} from '../../lib/api-error';
import { asyncHandler } from '../../lib/async-handler';
import { nameSchema, storeIdSchema } from './store.schema';

// POST /api/v1/stores - Create new store
export const createStore = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new UnauthorizedError(
      'Authentication failed! Please log in to continue.'
    );
  }

  const name = nameSchema.safeParse(req.body.name);
  if (!name.success) {
    throw new BadRequestError(name.error?.errors[0]?.message);
  }

  const store = await createStoreQuery(userId, name.data);

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
  const userId = req.user?.id;
  if (!userId) {
    throw new UnauthorizedError(
      'Authentication failed! Please log in to continue.'
    );
  }

  const stores = await getStoresQuery(userId);

  res.status(200).json({
    success: true,
    data: {
      message: 'Stores fetched successfully!',
      stores: stores,
    },
  });
});

// GET /api/v1/store/:storeId - Get store
export const getStore = asyncHandler(async (req: Request, res: Response) => {
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

  res.status(200).json({
    success: true,
    data: {
      message: 'Store fetched successfully!',
      store: store,
    },
  });
});

// PATCH /api/v1/stores/:storeId- Update store
export const updateStore = asyncHandler(async (req: Request, res: Response) => {
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

  const existingStore = await getStoreQuery(userId, storeId.data);
  if (!existingStore) {
    throw new NotFoundError('Store not found!');
  }

  const store = await updateStoreQuery(userId, existingStore.id, name.data);

  res.status(200).json({
    success: true,
    data: {
      message: 'Store updated successfully!',
      store: store,
    },
  });
});

// DELETE /api/v1/stores/:storeId - Delete store
export const deleteStore = asyncHandler(async (req: Request, res: Response) => {
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

  const existingStore = await getStoreQuery(userId, storeId.data);
  if (!existingStore) {
    throw new NotFoundError('Store not found!');
  }

  const store = await deleteStoreQuery(userId, existingStore.id);

  res.status(200).json({
    success: true,
    data: {
      message: 'Store deleted successfully!',
      store: store,
    },
  });
});
