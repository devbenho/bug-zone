import { IUserRepository } from '@contracts/repositories/user.repository';
import { IJwtService } from '@contracts/services/IJwt';
import { AuthRequest, AuthResponse } from '@contracts/dtos/auth';
import { IHasherService } from '@contracts/services/IHasher';
import { UnauthorizedError } from '@contracts/errors/unauthorized.error';
import { inject, injectable } from 'inversify';
import { symbols } from '@/web/rest/ioc/symbols';
import { BaseUseCase } from '@application/shared';

@injectable()
class LoginInteractor extends BaseUseCase<AuthRequest, AuthResponse> {
  constructor(
    @inject(symbols.IUserRepository) private _userRepository: IUserRepository,
    @inject(symbols.IJwtService) private _jwtService: IJwtService,
    @inject(symbols.IHasherService) private _hasherService: IHasherService,
  ) {
    super();
  }
  protected async performOperation(
    request: AuthRequest,
  ): Promise<AuthResponse> {
    const user =
      (await this._userRepository.findByEmail(request.login)) ||
      (await this._userRepository.findByUsername(request.login));
    if (
      !user ||
      !(await this._hasherService.compare(request.password, user.password))
    ) {
      throw new UnauthorizedError('Invalid credentials');
    }
    const token = this._jwtService.sign(user.id!);
    const result: AuthResponse = {
      token,
      tokenExpiration: new Date(Date.now() + 1000 * 60 * 60),
      refreshToken: this._jwtService.sign(user.id!),
      refreshTokenExpiration: new Date(Date.now() + 1000 * 60 * 60 * 24),
      userDetails: user,
    };

    return result;
  }

  public async login(request: AuthRequest): Promise<AuthResponse> {
    return this.execute(request);
  }
}

export { LoginInteractor };
