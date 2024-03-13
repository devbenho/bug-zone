import jwt from "jsonwebtoken";
import { IJwtService, PayloadObj } from "./jwt.service";
import { getEnvVar } from "../../config/get-env-var";
import { injectable } from "inversify";
@injectable()
export class JwtService implements IJwtService {
  sign = (payload: PayloadObj): string => {
    return jwt.sign(payload, getEnvVar("jwtSecret"), {
      expiresIn: getEnvVar("jwtExpiresIn"),
    });
  };
  verify = (token: string): PayloadObj => {
    return jwt.verify(token, getEnvVar("jwtSecret")) as PayloadObj;
  };
}
