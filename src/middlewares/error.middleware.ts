import { Request, Response, NextFunction } from 'express';

import { ApiError } from '../lib/api-error';

export async function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    console.log(err);
    res.status(err.statusCode || 500).json({
      success: false,
      error: {
        type: err.type || 'InternalError',
        message: err.message || 'Internal server error',
      },
    });
  }
  next();
}
