import { LoginResponseDto } from '@domain/dtos/responses/auth/login.dto';

interface ILoginOutPort {
  presentLoginResponse(responseModel: LoginResponseDto): void;
}

export { ILoginOutPort };
