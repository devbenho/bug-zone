import { IUserRepository } from '@contracts/repositories/user.repository';
import { IRegisterInputPort } from './register.input-port';
import { RegisterUserRequestDto } from '@domain/dtos/requests/auth/register.dto';
import { RegisterUserResponseDto } from '@domain/dtos/responses/auth/register.dto';
import { User } from '@domain/entities';
import { IMapper } from '@application/shared/mapper';
import { IJwtService } from '@contracts/services/IJwt';

class RegisterInteractor implements IRegisterInputPort {
  constructor(
    private _userRepository: IUserRepository,
    private _mapper: IMapper<User, RegisterUserRequestDto>,
    private _jwtService: IJwtService,
  ) {}
  async execute(
    request: RegisterUserRequestDto,
  ): Promise<RegisterUserResponseDto> {
    const user: User = this._mapper.mapFromDto(request);
    const createdUser = await this._userRepository.create(user);
    const result: RegisterUserResponseDto = {
      userId: createdUser.id!,
      jwt: this._jwtService.sign(createdUser.id!),
    };
    return result;
  }
}

export { RegisterInteractor };
