enum ErrorType {
  BAD_REQUEST = 'BadRequest',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'NotFound',
  INTERNAL = 'Internal',
}

export class ApiError extends Error {
  public type: ErrorType;
  public statusCode: number;

  constructor(type: ErrorType, statusCode: number, message: string) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;

    // Required for instanceof checks to work correctly
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = 'Bad request') {
    super(ErrorType.BAD_REQUEST, 400, message);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(ErrorType.UNAUTHORIZED, 401, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden') {
    super(ErrorType.FORBIDDEN, 403, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Not found') {
    super(ErrorType.NOT_FOUND, 404, message);
  }
}

export class InternalError extends ApiError {
  constructor(message: string = 'Internal server error') {
    super(ErrorType.INTERNAL, 500, message);
  }
}
