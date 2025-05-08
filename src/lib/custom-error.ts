import { ApiError, ErrorType } from "./api-error";

export class BadRequestError extends ApiError {
  constructor(message: string = "Bad Request") {
    super(400, ErrorType.BAD_REQUEST, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Not Found") {
    super(404, ErrorType.NOT_FOUND, message);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = "Unauthorized") {
    super(401, ErrorType.UNAUTHORIZED, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = "Forbidden") {
    super(403, ErrorType.FORBIDDEN, message);
  }
}

export class InternalError extends ApiError {
  constructor(message: string = "Internal Server Error") {
    super(500, ErrorType.INTERNAL, message);
  }
}

export class TokenExpiredError extends ApiError {
  constructor(message: string = "Token Expired") {
    super(401, ErrorType.TOKEN_EXPIRED, message);
  }
}

export class BadTokenError extends ApiError {
  constructor(message: string = "Bad Token") {
    super(401, ErrorType.BAD_TOKEN, message);
  }
}

export class AccessTokenError extends ApiError {
  constructor(message: string = "Access Token Error") {
    super(401, ErrorType.ACCESS_TOKEN_ERROR, message);
  }
}
