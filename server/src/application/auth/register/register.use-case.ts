import 'reflect-metadata';
import { IMapper } from '@application/shared/mapper';
import { AuthResponseDto } from '@contracts/dtos/auth';
import { CreateUserDto } from '@contracts/dtos/users';
import { IJwtService } from '@contracts/services/IJwt';
import { User } from '@domain/entities';
import { TYPES } from '@infrastructure/shared/config/ioc/types';
import { inject, injectable } from 'inversify';
import { BaseUseCase } from '@application/shared';
import { IUserRepository } from '@domain/repositories/user.repository';

@injectable()
class RegisterUsecase extends BaseUseCase<CreateUserDto, AuthResponseDto> {
  constructor(
    @inject(TYPES.IUserRepository) private _userRepository: IUserRepository,
    @inject(TYPES.IJwtService) private _jwtService: IJwtService,
    @inject(TYPES.IUserMapper) private _mapper: IMapper<User, CreateUserDto>,
  ) {
    super();
  }
  public async performOperation(request: CreateUserDto): Promise<AuthResponseDto> {
    const user = this._mapper.mapFromDto(request);
    const createdUser = await this._userRepository.create(user);
    const result: AuthResponseDto = {
      token: this._jwtService.sign(createdUser.id!),
      tokenExpiration: new Date(Date.now() + 1000 * 60 * 60),
      refreshToken: this._jwtService.sign(createdUser.id!),
      refreshTokenExpiration: new Date(Date.now() + 1000 * 60 * 60 * 24),
      userDetails: createdUser,
    };
    return result;
  }
}

export { RegisterUsecase };