import { AuthResponse } from '@contracts/dtos/auth';

interface IRegisterOutPort {
  presentRegisterResponse(responseModel: AuthResponse): void;
  RegisterUserVM: AuthResponse;
}

export { IRegisterOutPort };
