import { Request, Response, NextFunction } from "express";
import { ApplicationError } from "../../../application/common/errors/application.error";
import { LOGGER } from "../logger";

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
