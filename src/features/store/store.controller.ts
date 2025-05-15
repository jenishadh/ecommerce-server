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
  UnauthorizedError,
} from '../../lib/api-error';

// POST /api/v1/stores - create new store
export async function createStore(req: Request, res: Response) {
  try {
    const user = req.user;
    const { name } = req.body;

    if (!user || !user.id) {
      throw new UnauthorizedError('You are not logged in!');
    }

    if (!name) {
      throw new BadRequestError('Store name is required!');
    }

    const store = await createStoreQuery(user.id, name);

    res.status(201).json({
      message: 'Store created successfully!',
      store,
    });
  } catch (error) {
    console.log(error);
    throw new InternalError('Failed to create store!');
  }
}

// GET /api/v1/stores - get all stores
export async function getStores(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user || !user.id) {
      throw new UnauthorizedError('You are not logged in!');
    }

    const stores = await getStoresQuery(user.id);

    res.status(200).json({
      message: 'Stores fetched successfully!',
      stores,
    });
  } catch (error) {
    console.log(error);
    throw new InternalError('Failed to get stores data!');
  }
}

// GET /api/v1/store/:id - get store
export async function getStore(req: Request, res: Response) {
  try {
    const user = req.user;
    const storeId = req.params.id;

    if (!user || !user.id) {
      throw new UnauthorizedError('You are not logged in!');
    }

    if (!storeId) {
      throw new BadRequestError('Store id is required!');
    }

    const store = await getStoreQuery(user.id, storeId);

    res.status(200).json({
      message: 'Stores fetched successfully!',
      store,
    });
  } catch (error) {
    console.log(error);
    throw new InternalError('Failed to get store data!');
  }
}

// PATCH /api/v1/stores/:id - update store
export async function updateStore(req: Request, res: Response) {
  try {
    const user = req.user;
    const { name } = req.body;
    const storeId = req.params.id;

    if (!user || !user.id) {
      throw new UnauthorizedError('You are not logged in!');
    }

    if (!name) {
      throw new BadRequestError('Store name is required!');
    }

    if (!storeId) {
      throw new BadRequestError('Store id is required!');
    }

    const store = await updateStoreQuery(user.id, storeId, name);

    res.status(201).json({
      message: 'Store updated successfully!',
      store,
    });
  } catch (error) {
    console.log(error);
    throw new InternalError('Failed to update store!');
  }
}

// DELETE /api/v1/stores/:id - delete store
export async function deleteStore(req: Request, res: Response) {
  try {
    const user = req.user;
    const storeId = req.params.id;

    if (!user || !user.id) {
      throw new UnauthorizedError('You are not logged in!');
    }

    if (!storeId) {
      throw new BadRequestError('Store id is required!');
    }

    const store = await deleteStoreQuery(user.id, storeId);

    res.status(201).json({
      message: 'Store deleted successfully!',
      store,
    });
  } catch (error) {
    console.log(error);
    throw new InternalError('Failed to delete store!');
  }
}
