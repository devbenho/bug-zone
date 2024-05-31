import jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import dotenv from 'dotenv';
import { IJwtService, JwtPayload } from '@contracts/services/IJwt';
dotenv.config();

@injectable()
export class JwtService implements IJwtService {
  sign = (payload: JwtPayload): string => {
    return jwt.sign(payload, 'secret');
  };
  verify = (token: string): JwtPayload => {
    return jwt.verify(token, 'secret') as JwtPayload;
  };
}
