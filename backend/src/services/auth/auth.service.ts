import { LoginRequestDto } from "../../dtos/requests/auth/login.dto";
import { RegisterUserRequestDto } from "../../dtos/requests/auth/register.dto";
import { LoginResponseDto } from "../../dtos/responses/auth/login.dto";
import { RegisterUserResponseDto } from "../../dtos/responses/auth/register.dto";

interface IAuthService {
  login: (payload: LoginRequestDto) => Promise<LoginResponseDto>;
  register: (
    payload: RegisterUserRequestDto,
  ) => Promise<RegisterUserResponseDto>;
  logout: (token: string) => Promise<void>;
  verify: (token: string) => Promise<void>;
  refreshToken: (token: string) => Promise<string>;
}

export type { IAuthService };
