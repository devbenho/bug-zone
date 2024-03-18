import jwt from "jsonwebtoken";
import { IJwtService, PayloadObj } from "./jwt.service";
import { injectable } from "inversify";
import dotenv from "dotenv";
dotenv.config();
@injectable()
export class JwtService implements IJwtService {
  sign = (payload: PayloadObj): string => {
    return jwt.sign(payload, "secret", {
      expiresIn: process.env.JWT_EXPIRE!,
    });
  };
  verify = (token: string): PayloadObj => {
    return jwt.verify(token, "secret") as PayloadObj;
  };
}
