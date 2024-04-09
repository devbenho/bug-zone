import { LoginRequestDto } from '@domain/dtos/requests/auth/login.dto';
import { LoginResponseDto } from '@domain/dtos/responses/auth/login.dto';

interface ILoginInputPort {
  execute(request: LoginRequestDto): Promise<LoginResponseDto>;
}
export { ILoginInputPort };
