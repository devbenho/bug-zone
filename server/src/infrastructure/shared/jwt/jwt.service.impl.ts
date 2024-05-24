import jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import dotenv from 'dotenv';
import { IJwtService } from '@contracts/services/IJwt';
dotenv.config();
@injectable()
export class JwtService implements IJwtService {
  sign = (payload: string): string => {
    return jwt.sign(payload, 'secret');
  };
  verify = (token: string): string => {
    return jwt.verify(token, 'secret') as string;
  };
}
