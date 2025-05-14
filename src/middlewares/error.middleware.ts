import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../lib/api-error';

export async function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    next();
  }
}
