import { RegisterUserRequestDto } from '@domain/dtos/requests/auth/register.dto';
import { RegisterUserResponseDto } from '@domain/dtos/responses/auth/register.dto';

interface IRegisterInputPort {
  execute(request: RegisterUserRequestDto): Promise<RegisterUserResponseDto>;
}

export { IRegisterInputPort };
