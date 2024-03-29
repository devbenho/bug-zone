import { inject, injectable } from 'inversify';
import { symbols } from '../../../../utils/ioc/symbols';
import { LoginRequestDto } from '../../web/rest/dtos/requests/auth/login.dto';
import { RegisterUserRequestDto } from '../../web/rest/dtos/requests/auth/register.dto';
import { LoginResponseDto } from '../../web/rest/dtos/responses/auth/login.dto';
import { RegisterUserResponseDto } from '../../web/rest/dtos/responses/auth/register.dto';
import { IJwtService } from '../../infrastcuture/jwt/jwt.service';
import { IAuthService } from '../../web/rest/services/auth/auth.service';
import bcrypt from 'bcrypt';
import { IUserRepository } from '../../contracts/repositories/user.repository';
import { User } from '@domain/entities/user';
@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(symbols.IJwtService) private _jwtService: IJwtService,
    @inject(symbols.IUserRepository) private _userRepository: IUserRepository
  ) {}
  login = async (payload: LoginRequestDto): Promise<LoginResponseDto> => {
    const { login, password } = payload;
    if (!login && !password) {
      throw new Error('Invalid input');
    }
    const user =
      (await this._userRepository.findByEmail({ email: login })) ||
      ((await this._userRepository.findByUsername({ username: login })) as User);

    if (!user) {
      throw new Error('Invalid Credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid Credentials');
    }
    const jwt = this._jwtService.sign({ userId: user.id });
    return { user, jwt };
  };

  register = async (payload: RegisterUserRequestDto): Promise<RegisterUserResponseDto> => {
    const { firstName, lastName, username, email, password } = payload;
    if (!firstName || !lastName || !username || !email || !password) {
      throw new Error('Invalid input');
    }

    // is user exists
    const user =
      (await this._userRepository.findByEmail({ email })) ||
      (await this._userRepository.findByUsername({ username }));

    if (user) {
      throw new Error('User already exists');
    }

    const query = await this._userRepository.create(payload);
    const userId = query.id;
    const jwt = this._jwtService.sign({ userId });
    return { userId, jwt };
  };
  logout: (token: string) => Promise<void>;
  verify: (token: string) => Promise<void>;
  refreshToken!: (token: string) => Promise<string>;
}
