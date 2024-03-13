import ERROR_MESSAGES from "../eums/error-messages.enum";

export class ApplicationError extends Error {
  public code: number;

  constructor(code: number, message: string, ...args: any[]) {
    super(...args);
    this.code = code;
    this.message = message;
  }
}

export class BadRequestError extends ApplicationError {
  constructor(message: string, ...args: any[]) {
    super(400, message, ...args);
  }
}

export class UnauthorizedError extends ApplicationError {
  constructor(message?: string) {
    super(401, message || ERROR_MESSAGES.UNAUTHORIZED);
  }
}

export class ForbiddenError extends ApplicationError {
  constructor(message?: string, ...args: any[]) {
    super(403, message || ERROR_MESSAGES.FORBIDDEN, ...args);
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message?: string, ...args: any[]) {
    super(404, message || ERROR_MESSAGES.NOT_FOUND, ...args);
  }
}

export class MissingFieldError extends BadRequestError {
  constructor(fieldName: string, ...args: any[]) {
    super(`${fieldName} is required`, ...args);
  }
}

export class InternalError extends ApplicationError {
  constructor(message?: string, ...args: any[]) {
    super(500, message || ERROR_MESSAGES.UNKNOWN_ERROR_TRY_AGAIN, ...args);
  }
}

export class InvalidIdError extends BadRequestError {
  constructor(...args: any[]) {
    super(ERROR_MESSAGES.REPOSITORY_ERROR_INVALID_ID, ...args);
  }
}

export class RepositoryMissingField extends BadRequestError {
  constructor(...args: any[]) {
    super("Field missing", ...args);
  }
}

export class EnvVariableMissingError extends InternalError {
  constructor(variableName: string, ...args: any[]) {
    super(`Environment variable ${variableName} is missing`, ...args);
  }
}
