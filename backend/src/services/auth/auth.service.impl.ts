import { inject, injectable } from "inversify";
import { LoginRequestDto } from "../../dtos/requests/auth/login.dto";
import { RegisterUserRequestDto } from "../../dtos/requests/auth/register.dto";
import { LoginResponseDto } from "../../dtos/responses/auth/login.dto";
import { RegisterUserResponseDto } from "../../dtos/responses/auth/register.dto";
import { IUserRepository } from "../../repositories/user/user.repo";
import { IAuthService } from "./auth.service";
import User from "../../entities/user";
import { IJwtService, PayloadObj } from "../jwt/jwt.service";
import { log } from "console";
import { LOGGER } from "../../utils/logger";

@injectable()
export class AuthService implements IAuthService {
  @inject("IUserRepository") private _userRepository: IUserRepository;
  @inject("IJwtService") private _jwtService: IJwtService;
  login = async (payload: LoginRequestDto): Promise<LoginResponseDto> => {
    const user =
      (await this._userRepository.getByUsername(payload.login)) ||
      (await this._userRepository.getByEmail(payload.login));
    if (!user) {
      throw new Error("User not found");
    }
    if (user.password !== payload.password) {
      throw new Error("Invalid password");
    }
    const result: LoginResponseDto = {
      user: user,
      jwt: "token",
    };
    return result;
  };

  register = async (
    payload: RegisterUserRequestDto
  ): Promise<RegisterUserResponseDto> => {
    const { firstName, lastName, username, email, password } = payload;
    if (!firstName || !lastName || !username || !email || !password) {
      throw new Error("Invalid input");
    }

    // is user exists
    const user =
      (await this._userRepository.getByEmail(payload.email)) ||
      (await this._userRepository.getByUsername(payload.username));
    LOGGER.error("before user check");
    if (user) {
      throw new Error("User already exists");
    }
    const newUser = (await this._userRepository.create(
      payload as User
    )) as User;
    log("new user", newUser);
    const token = this._jwtService.sign({ userdId: newUser.id });
    const result: RegisterUserResponseDto = {
      user: newUser,
      jwt: token,
    };
    return result;
  };
  logout: (token: string) => Promise<void>;
  verify: (token: string) => Promise<void>;
  refreshToken: (token: string) => Promise<string>;
}
