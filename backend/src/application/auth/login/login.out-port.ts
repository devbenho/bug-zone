import { AuthResponse } from '@contracts/dtos/auth';

interface ILoginOutPort {
  presentLoginResponse(responseModel: AuthResponse): void;
  LoginUserVM: AuthResponse;
}

export { ILoginOutPort };
