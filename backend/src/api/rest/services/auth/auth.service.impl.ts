import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { symbols } from "../../../../utils/ioc/symbols";
import { LOGGER } from "../../../../utils/logger";
import appDataSource from "../../database/data-source";
import { LoginRequestDto } from "../../dtos/requests/auth/login.dto";
import { RegisterUserRequestDto } from "../../dtos/requests/auth/register.dto";
import { LoginResponseDto } from "../../dtos/responses/auth/login.dto";
import { RegisterUserResponseDto } from "../../dtos/responses/auth/register.dto";
import { IJwtService } from "../jwt/jwt.service";
import { IAuthService } from "./auth.service";
import { UserRepository } from "../../repositories/user.repo";
import bcrypt from "bcrypt";
@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(symbols.IJwtService) private _jwtService: IJwtService,
    private _userRepository: UserRepository = new UserRepository(appDataSource)
  ) {}
  login = async (payload: LoginRequestDto): Promise<LoginResponseDto> => {
    const { login, password } = payload;
    if (!login && !password) {
      throw new Error("Invalid input");
    }
    const user = await this._userRepository.findByUsernameOrEmail(login, login);
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }
    const jwt = this._jwtService.sign({ userId: user.id });
    return { user, jwt };
  };

  register = async (
    payload: RegisterUserRequestDto
  ): Promise<RegisterUserResponseDto> => {
    const { firstName, lastName, username, email, password } = payload;
    if (!firstName || !lastName || !username || !email || !password) {
      throw new Error("Invalid input");
    }

    // is user exists
    const user = await this._userRepository.findByUsernameOrEmail(
      username,
      email
    );

    if (user) {
      throw new Error("User already exists");
    }
    // insert the user into the database

    const query = await this._userRepository
      .createQueryBuilder("user")
      .insert()
      .values({
        firstName,
        lastName,
        username,
        email,
        password,
      })
      .execute();
    if (query.identifiers[0].id === undefined) {
      throw new Error("User not created");
    }
    const userId = query.identifiers[0].id;
    const jwt = this._jwtService.sign({ userId });
    return { userId, jwt };
  };
  logout: (token: string) => Promise<void>;
  verify: (token: string) => Promise<void>;
  refreshToken!: (token: string) => Promise<string>;
}
