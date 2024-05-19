import { AuthResponse } from '@contracts/dtos/auth';
import { CreateUserDto } from '@contracts/dtos/users';

interface IRegisterInputPort {
  execute(request: CreateUserDto): Promise<AuthResponse>;
}

export { IRegisterInputPort };
