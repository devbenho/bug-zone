import { AuthRequestDto, AuthResponseDto } from '@contracts/dtos/auth';
import { UnauthorizedError } from '@contracts/errors/unauthorized.error';
import { IHasherService } from '@contracts/services/IHasher';
import { IJwtService, JwtPayload } from '@contracts/services/IJwt';
import { TYPES } from '@infrastructure/shared/ioc/types';
import { inject, injectable } from 'inversify';
import { BaseUseCase } from '@application/shared';
import { IUserRepository } from '@domain/repositories/user.repository';
import { log } from 'console';
@injectable()
class LoginUseCase extends BaseUseCase<AuthRequestDto, AuthResponseDto> {
  constructor(
    @inject(TYPES.IUserRepository) private _userRepository: IUserRepository,
    @inject(TYPES.IJwtService) private _jwtService: IJwtService,
    @inject(TYPES.IHasherService) private _hasherService: IHasherService,
  ) {
    super();
  }
  public async performOperation(
    request: AuthRequestDto,
  ): Promise<AuthResponseDto> {
    const user =
      (await this._userRepository.findByEmail(request.login)) ||
      (await this._userRepository.findByUsername(request.login));
    if (
      !user ||
      !(await this._hasherService.compare(request.password, user.password))
    ) {
      throw new UnauthorizedError('Invalid credentials');
    }
    if (!user) {
      throw new UnauthorizedError('User not found');
    }
    const token = this._jwtService.sign({ userId: user.id as string });
    const result: AuthResponseDto = {
      token,
      tokenExpiration: new Date(Date.now() + 1000 * 60 * 60),
      refreshToken: this._jwtService.sign({ userId: user.id as string }),
      refreshTokenExpiration: new Date(Date.now() + 1000 * 60 * 60 * 24),
      userDetails: user,
    };
    return result;
  }
}

export { LoginUseCase };
