import { Request, Response, NextFunction } from "express";
import { ApplicationError } from "../../../utils/errors";
import { LOGGER } from "../../../utils/logger";

export const errorHandlerMiddleware = (
  err: ApplicationError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  LOGGER.error(err);
  return res.status(err.code || 500).json({
    success: false,
    error: err.message || "BOOM",
  });
};
