import { VerifyErrors } from 'jsonwebtoken';
import { JwtService } from '../../../infrastructure/shared/jwt/jwt.service.impl';
import { UserRepository } from '@infrastructure/users';
import { container } from '@infrastructure/shared/ioc/inversify.config';
import {
  TokenExpiredError,
  BadTokenError,
} from '@contracts/errors/unauthorized.error';
import { DataSource } from 'typeorm';
import { LOGGER } from '../logger';
import { JwtPayload } from '@contracts/services/IJwt';
import { ExpressHandler } from '../infrastructure/express-handler';

class AuthMiddleware {
  public static jwtParseMiddleware: ExpressHandler<any, any> = async (
    req: any,
    res: any,
    next: any,
  ) => {
    const jwtService = new JwtService();
    const userRepository = new UserRepository(container.get(DataSource));
    const token = req.headers.authorization?.split(' ')[1];
    LOGGER.info(`Token: ${token}`);
    if (!token) {
      return next();
    }

    let payload: JwtPayload;

    try {
      payload = jwtService.verify(token) as JwtPayload;
    } catch (e) {
      const verifyErr = e as VerifyErrors;
      if (verifyErr instanceof TokenExpiredError) {
        return next(new TokenExpiredError());
      }
      return next(new BadTokenError());
    }

    const user = await userRepository.findById(payload.userId);

    if (!user) {
      return next(new Error('User not found'));
    }

    res.locals.userId = user.id;
    res.locals.user = user;
    return next();
  };

  public static enforceJwtMiddleware: ExpressHandler<any, any> = async (
    _: any,
    res: any,
    next: any,
  ) => {
    if (!res.locals.userId) {
      return res.sendStatus(401);
    }
    return next();
  };
}

export { AuthMiddleware };
