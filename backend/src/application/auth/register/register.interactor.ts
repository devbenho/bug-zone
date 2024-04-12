import { IUserRepository } from '@contracts/repositories/user.repository';
import { User } from '@domain/entities';
import { IMapper } from '@application/shared/mapper';
import { IJwtService } from '@contracts/services/IJwt';
import { CreateUserDto } from '@contracts/dtos/users';
import { AuthResponse } from '@contracts/dtos/auth';
import { inject, injectable } from 'inversify';
import { symbols } from '@/web/rest/ioc/symbols';
import { BaseUseCase } from '@application/shared';

@injectable()
class RegisterInteractor extends BaseUseCase<CreateUserDto, AuthResponse> {
  constructor(
    @inject(symbols.IUserRepository) private _userRepository: IUserRepository,
    @inject(symbols.IJwtService) private _jwtService: IJwtService,
    @inject(symbols.IMapper) private _mapper: IMapper<User, CreateUserDto>,
  ) {
    super();
  }
  protected async performOperation(
    request: CreateUserDto,
  ): Promise<AuthResponse> {
    const user = this._mapper.mapFromDto(request);
    const createdUser = await this._userRepository.create(user);
    const result: AuthResponse = {
      token: this._jwtService.sign(createdUser.id!),
      tokenExpiration: new Date(Date.now() + 1000 * 60 * 60),
      refreshToken: this._jwtService.sign(createdUser.id!),
      refreshTokenExpiration: new Date(Date.now() + 1000 * 60 * 60 * 24),
      userDetails: createdUser,
    };
    return result;
  }
}

export { RegisterInteractor };
