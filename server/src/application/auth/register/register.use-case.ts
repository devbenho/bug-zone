import 'reflect-metadata';
import { AuthResponseDto } from '@contracts/dtos/auth';
import { CreateUserDto } from '@contracts/dtos/users';
import { BaseUseCase, UseCase } from '@application/shared';
import { TokenProviderDomainService } from '@domain/shared/services/token-provider.domain-service';
import { User, UserRepository } from '@domain/entities';
import { JwtPayload } from '@contracts/services/IJwt';
import { HasherDomainService } from '@domain/shared/services';

@UseCase()
class RegisterUsecase extends BaseUseCase<CreateUserDto, AuthResponseDto> {
  private _userRepository: UserRepository;
  private _jwtService: TokenProviderDomainService;

  constructor(
    userRepository: UserRepository,
    jwtService: TokenProviderDomainService,
  ) {
    super();
    this._userRepository = userRepository;
    this._jwtService = jwtService;
  }

  public async performOperation(
    request: CreateUserDto,
  ): Promise<AuthResponseDto> {
    const user: User = User.create(
      null,
      request.firstName,
      request.lastName,
      request.email,
      request.username,
      request.password,
      request.roles,
      new Date(),
      request.username,
    );
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
      userDetails: createdUser,
    };
    return result;
  }
}

export { RegisterUsecase };
