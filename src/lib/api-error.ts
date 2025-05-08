import { Response } from "express";

export enum ErrorType {
  NOT_FOUND = "NotFound",
  UNAUTHORIZED = "Unauthorized",
  FORBIDDEN = "Forbidden",
  BAD_REQUEST = "BadRequest",
  INTERNAL = "Internal",
  TOKEN_EXPIRED = "TokenExpired",
  BAD_TOKEN = "BadToken",
  ACCESS_TOKEN_ERROR = "AccessTokenError",
}

export class ApiError extends Error {
  public type: ErrorType;
  public statusCode: number;

  constructor(statusCode: number, type: ErrorType, message: string) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static handle(err: ApiError, res: Response) {
    const statusCode = err.statusCode || 500;
    const type = err.type || ErrorType.INTERNAL;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
      type,
      message,
    });
  }
}
