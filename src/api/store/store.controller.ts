import { Response } from 'express';

import * as Query from './store.queries';
import * as Schema from './store.schema';

import { AuthenticatedRequest } from '../../types';
import { idSchema } from '../../schemas';
import { asyncHandler } from '../../lib/async-handler';
import { findEntity } from '../../utils/find-entity';
import { validateId, validateSchema } from '../../utils/validate';

// POST /api/v1/stores - Create new store
export const createStore = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const validatedBody = validateSchema(Schema.store, { ...req.body });
    const { name } = validatedBody;

    const store = await Query.createStore(userId, name);

    res.status(201).json({
      success: true,
      data: {
        message: 'Store created successfully!',
        store: store,
      },
    });
  }
);

// GET /api/v1/stores - Get all stores
export const getStores = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const stores = await Query.getStoresById(userId);

    res.status(200).json({
      success: true,
      data: {
        message: 'Stores fetched successfully!',
        stores: stores,
      },
    });
  }
);

// GET /api/v1/store/:storeId - Get store
export const getStore = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const storeId = validateId(idSchema('store'), req.params.storeId);

    const store = await findEntity(
      userId,
      storeId,
      Query.getStoreById,
      'Store'
    );

    res.status(200).json({
      success: true,
      data: {
        message: 'Store fetched successfully!',
        store: store,
      },
    });
  }
);

// PATCH /api/v1/stores/:storeId- Update store
export const updateStore = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const storeId = validateId(idSchema('store'), req.params.storeId);

    const validatedBody = validateSchema(Schema.store, { ...req.body });
    const { name } = validatedBody;

    const existingStore = await findEntity(
      userId,
      storeId,
      Query.getStoreById,
      'Store'
    );

    const store = await Query.updateStore(userId, existingStore.id, name);

    res.status(200).json({
      success: true,
      data: {
        message: 'Store updated successfully!',
        store: store,
      },
    });
  }
);

// DELETE /api/v1/stores/:storeId - Delete store
export const deleteStore = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const storeId = validateId(idSchema('store'), req.params.storeId);

    const existingStore = await findEntity(
      userId,
      storeId,
      Query.getStoreById,
      'Store'
    );

    const store = await Query.deleteStore(userId, existingStore.id);

    res.status(200).json({
      success: true,
      data: {
        message: 'Store deleted successfully!',
        store: store,
      },
    });
  }
);
