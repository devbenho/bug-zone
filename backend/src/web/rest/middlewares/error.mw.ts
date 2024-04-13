import { Request, Response, NextFunction } from 'express';
import { LOGGER } from '../logger';
import { ApplicationError } from '@contracts/errors/application.error';

export const errorHandlerMiddleware = (
  err: ApplicationError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  LOGGER.error(err);
  return res.status(err.code || 500).json({
    success: false,
    error: err.message || 'BOOM',
  });
};
