import 'reflect-metadata';
import { AuthResponseDto } from '@contracts/dtos/auth';
import { CreateUserDto } from '@contracts/dtos/users';
import { BaseUseCase, UseCase } from '@application/shared';
import { TokenProviderDomainService } from '@domain/shared/services/token-provider.domain-service';
import { UserRepository } from '@domain/entities';
import { JwtPayload } from '@contracts/services/IJwt';
import { HasherDomainService } from '@domain/shared/services';
import { Hash } from 'crypto';

@UseCase()
class RegisterUsecase extends BaseUseCase<CreateUserDto, AuthResponseDto> {
  private _userRepository: UserRepository;
  private _jwtService: TokenProviderDomainService;
  private _hasherService: HasherDomainService;

  constructor(
    userRepository: UserRepository,
    jwtService: TokenProviderDomainService,
    hasherService: HasherDomainService,
  ) {
    super();
    this._userRepository = userRepository;
    this._jwtService = jwtService;
    this._hasherService = hasherService;
  }

  public async performOperation(
    request: CreateUserDto,
  ): Promise<AuthResponseDto> {
    const user = request.toEntity();
    user.password = await HasherDomainService.hash(user.password);
    const createdUser = await this._userRepository.saveUser(user);
    const payload = {
      email: { value: user.email },
      roles: user.roles.map(role => ({ value: role })),
      username: { value: user.username },
      userUuid: { value: user.id as string },
    } as JwtPayload;

    const token = this._jwtService.createAccessToken(payload);

    const result: AuthResponseDto = {
      token,
      tokenExpiration: new Date(Date.now() + 1000 * 60 * 60),
      userDetails: createdUser,
    };
    return result;
  }
}

export { RegisterUsecase };
