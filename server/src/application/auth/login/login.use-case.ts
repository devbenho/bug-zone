import { AuthRequest, AuthResponseDto } from '@contracts/dtos/auth';
import { UnauthorizedError } from '@contracts/errors/unauthorized.error';
import { BaseUseCase, UseCase } from '@application/shared';
import { UserRepository } from '@domain/entities/users';
import { HasherDomainService } from '@domain/shared/services';
import { TokenProviderDomainService } from '@domain/shared/services/token-provider.domain-service';
import { JwtPayload } from '@contracts/services/IJwt';

@UseCase()
class LoginUseCase extends BaseUseCase<AuthRequest, AuthResponseDto> {
  private readonly _userRepository: UserRepository;
  private readonly _jwtService: TokenProviderDomainService;

  constructor(
    userRepository: UserRepository,
    jwtService: TokenProviderDomainService,
  ) {
    super();
    this._userRepository = userRepository;
    this._jwtService = jwtService;
  }

  public async performOperation(
    request: AuthRequest,
  ): Promise<AuthResponseDto> {
    const user =
      (await this._userRepository.findByUsername(request.login)) ||
      (await this._userRepository.findByEmail(request.login));
    if (!user) {
      throw new UnauthorizedError();
    }
    if (!(await HasherDomainService.compare(request.password, user.password))) {
      throw new UnauthorizedError();
    }

    const payload: JwtPayload = {
      email: { value: user.email },
      roles: user.roles.map(role => ({ value: role })),
      username: { value: user.username },
      userUuid: { value: user.id as string },
    };

    const token = this._jwtService.createAccessToken(payload);
    const result: AuthResponseDto = {
      token,
      // tokenExpiration type is Date
      tokenExpiration: new Date(),
      userDetails: user,
    };
    return result;
  }
}
export { LoginUseCase };
