import { Request, Response, NextFunction } from "express";
import { ApplicationError } from "../utils/errors";

export const errorHandlerMiddleware = (
  err: ApplicationError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(err.code).json({
    success: false,
    error: err.message,
  });
};
