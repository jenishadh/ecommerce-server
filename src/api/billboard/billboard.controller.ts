import { Request, Response } from 'express';

import {
  createBillboardQuery,
  deleteBillboardQuery,
  getBillboardQuery,
  getBillboardsQuery,
  updateBillboardQuery,
} from './billboard.queries';
import { getStoreQuery } from '../store/store.queries';
import { asyncHandler } from '../../lib/async-handler';
import {
  BadRequestError,
  InternalError,
  NotFoundError,
  UnauthorizedError,
} from '../../lib/api-error';
import { uploadOnCloudinary } from '../../lib/cloudinary';
import {
  billboardIdSchema,
  labelSchema,
  storeIdSchema,
} from './billboard.schema';

// POST /api/v1/stores/:storeId/billboards - Create new billboard
export const createBillboard = asyncHandler(
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

    const label = labelSchema.safeParse(req.body.label);
    if (!label.success) {
      throw new BadRequestError(label.error?.errors[0]?.message);
    }

    const image = req.file;
    if (!image) {
      throw new BadRequestError('Billboard image is required!');
    }

    const store = await getStoreQuery(userId, storeId.data);
    if (!store) {
      throw new NotFoundError('Store not found!');
    }

    const uploadedImage = await uploadOnCloudinary(image.path);
    if (!uploadedImage) {
      throw new InternalError('Image upload failed. Please try again later.');
    }

    const billboard = await createBillboardQuery(
      store.id,
      label.data,
      uploadedImage.secure_url
    );

    res.status(200).json({
      success: true,
      data: {
        message: 'Billboard created successfully.',
        billboard,
      },
    });
  }
);

// GET /api/v1/stores/:storeId/billboards - get all billboards
export const getBillboards = asyncHandler(
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

    const billboards = await getBillboardsQuery(userId, store.id);

    res.status(200).json({
      success: true,
      data: {
        message: 'Billboards fetched successfully!',
        billboards: billboards,
      },
    });
  }
);

// GET /api/v1/billboards/:billboardId - get billboard
export const getBillboard = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedError(
        'Authentication failed. Please log in to continue.'
      );
    }

    const billboardId = billboardIdSchema.safeParse(req.params.billboardId);
    if (!billboardId.success) {
      throw new BadRequestError(billboardId.error?.errors[0]?.message);
    }

    const billboard = await getBillboardQuery(userId, billboardId.data);
    if (!billboard) {
      throw new NotFoundError('Billboard not found.');
    }

    res.status(200).json({
      success: true,
      data: {
        message: 'Billboard fetched successfully!',
        billboard: billboard,
      },
    });
  }
);

// PATCH /api/v1/billboards/:billboardId - update billboard
export const updateBillboard = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedError(
        'Authentication failed. Please log in to continue.'
      );
    }

    const billboardId = billboardIdSchema.safeParse(req.params.billboardId);
    if (!billboardId.success) {
      throw new BadRequestError(billboardId.error?.errors[0]?.message);
    }

    const label = labelSchema.safeParse(req.body.label);
    if (!label.success) {
      throw new BadRequestError(label.error?.errors[0]?.message);
    }

    const image = req.file;
    if (!image) {
      throw new BadRequestError('Billboard image is required.');
    }

    const existingBillboard = await getBillboardQuery(userId, billboardId.data);
    if (!existingBillboard) {
      throw new NotFoundError('Billboard not found!');
    }

    const uploadedImage = await uploadOnCloudinary(image.path);
    if (!uploadedImage) {
      throw new InternalError('Image upload failed. Please try again later.');
    }

    const billboard = await updateBillboardQuery(
      userId,
      existingBillboard.id,
      label.data,
      uploadedImage.secure_url
    );

    res.status(200).json({
      success: true,
      data: {
        message: 'Billboard updated successfully!',
        billboard: billboard,
      },
    });
  }
);

// DELETE /api/v1/billboards/:billboardId - delete billboard
export const deleteBillboard = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedError(
        'Authentication failed. Please log in to continue.'
      );
    }

    const billboardId = billboardIdSchema.safeParse(req.params.billboardId);
    if (!billboardId.success) {
      throw new BadRequestError(billboardId.error?.errors[0]?.message);
    }

    const existingBillboard = await getBillboardQuery(userId, billboardId.data);
    if (!existingBillboard) {
      throw new NotFoundError('Billboard not found!');
    }

    const billboard = await deleteBillboardQuery(userId, existingBillboard.id);

    res.status(200).json({
      success: true,
      data: {
        message: 'Billboard deleted successfully!',
        billboard: billboard,
      },
    });
  }
);
