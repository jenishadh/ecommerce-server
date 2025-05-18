import { Request, Response, NextFunction } from 'express';

import { ApiError } from '../lib/api-error';

export async function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ApiError) {
    console.log(error);
    res.status(error.statusCode).json({
      success: false,
      error: {
        type: error.type,
        message: error.message,
      },
    });
  } else {
    console.log(error);
    res.status(500).json({
      success: false,
      error: {
        type: 'InternalError',
        message: 'Internal server error',
      },
    });
  }
  next();
}
