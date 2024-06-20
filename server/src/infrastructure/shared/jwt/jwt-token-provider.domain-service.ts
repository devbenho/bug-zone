import jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';

import { Logger, Nullable } from '@domain/shared';
import { GlobalConfig } from '@infrastructure/shared/config';
import { DomainService } from '@domain/shared/services/domain-service.decorator';
import { TokenProviderDomainService } from '@domain/shared/services/token-provider.domain-service';
import { JwtPayload } from '@contracts/services/IJwt';

@DomainService({ type: TokenProviderDomainService })
class JwtTokenProvider extends TokenProviderDomainService {
  public createAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.jwtSecret, {
      algorithm: this.jwtAlgorithm,
      expiresIn: '3h',
    });
  }
  public verifyAccessToken(token: string): Nullable<JwtPayload> {
    const decoded = jwt.verify(token, this.jwtSecret) as JwtPayload;
    Logger.debug('JwtTokenProvider.verifyAccessToken', decoded);
    try {
      Logger.debug('JwtTokenProvider.verifyAccessToken', jwt.verify(token, this.jwtSecret) as JwtPayload);
      return jwt.verify(token, this.jwtSecret) as JwtPayload;
    } catch {
      return null;
    }
  }

  private readonly jwtAlgorithm: any = 'HS512';

  private readonly jwtSecret: string = GlobalConfig.JWT_SECRET;

  private readonly jwtExpiration: number = GlobalConfig.JWT_EXPIRATION;

  // private readonly jwtRefreshExpiration: number = GlobalConfig.JWT_REFRESH_EXPIRATION;

}

export { JwtTokenProvider };
