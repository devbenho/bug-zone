import { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { ExpressHandler } from "../infrastucture/express-handler";
import { JwtService } from "../../../infrastcuture/jwt/jwt.service.impl";
import { BadTokenError, TokenExpiredError } from "../../../utils/errors";
import appDataSource from "../database/data-source";
import { UserRepository } from "../repositories/user.repo";

export const jwtParseMiddleware: ExpressHandler<any, any> = async (
  req,
  res,
  next
) => {
  const jwtService = new JwtService();
  const userRepo = new UserRepository(appDataSource);
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next();
  }

  let payload: JwtPayload;
  try {
    payload = jwtService.verify(token) as JwtPayload;
  } catch (e) {
    const verifyErr = e as VerifyErrors;
    if (verifyErr instanceof TokenExpiredError) {
      throw new TokenExpiredError();
    }
    throw new BadTokenError();
  }

  const user = await userRepo
    .createQueryBuilder("user")
    .where("id = :id", {})
    .getOne();

  if (!user) {
    throw new Error("User not found");
  }
  res.locals.userId = user.id;
  return next();
};

export const enforceJwtMiddleware: ExpressHandler<any, any> = async (
  _,
  res,
  next
) => {
  if (!res.locals.userId) {
    return res.sendStatus(401);
  }
  return next();
};
