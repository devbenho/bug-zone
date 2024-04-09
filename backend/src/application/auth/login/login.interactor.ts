import { LoginRequestDto } from '@domain/dtos/requests/auth/login.dto';
import { LoginResponseDto } from '@domain/dtos/responses/auth/login.dto';
import { IUserRepository } from '@contracts/repositories/user.repository';
import { IJwtService } from '@contracts/services/IJwt';
import { ILoginInputPort } from './login.input-port';

class LoginInteractor implements ILoginInputPort {
  constructor(
    private _userRepository: IUserRepository,
    private _jwtService: IJwtService,
  ) {}
  async execute(request: LoginRequestDto): Promise<LoginResponseDto> {
    const user =
      (await this._userRepository.findByEmail(request.login)) ||
      (await this._userRepository.findByUsername(request.login));
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const token = this._jwtService.sign(user.id!);
    return {
      user,
      token,
    } as LoginResponseDto;
  }
}

export { LoginInteractor };
