import { Request, Response, NextFunction } from "express";

import logger from "../lib/logger";
import { ApiError } from "../lib/api-error";

export async function catchError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    logger.error(
      `${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}}`
    );
  } else {
    next();
  }
}
