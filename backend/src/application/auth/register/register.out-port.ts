import { RegisterUserResponseDto } from '@domain/dtos/responses/auth/register.dto';

interface IRegisterOutPort {
  presentRegisterResponse(responseModel: RegisterUserResponseDto): void;
}

export { IRegisterOutPort };
