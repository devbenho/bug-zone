import { LoginRequestDto } from "../../dtos/requests/auth/login.dto";
import { LoginResponseDto } from "../../dtos/responses/auth/login.dto";

interface IAuthService {
  login: (payload: LoginRequestDto) => Promise<LoginResponseDto>;
  register: (email: string, password: string) => Promise<string>;
  logout: (token: string) => Promise<void>;
  verify: (token: string) => Promise<void>;
  refreshToken: (token: string) => Promise<string>;
}

export type { IAuthService };
