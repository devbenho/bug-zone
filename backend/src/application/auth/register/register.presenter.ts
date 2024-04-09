import { RegisterUserResponseDto } from '@domain/dtos/responses/auth/register.dto';
import { IRegisterOutPort } from './register.out-port';

class RegisterPresenter implements IRegisterOutPort {
  RegisterUserVM: RegisterUserResponseDto;
  presentRegisterResponse(responseModel: RegisterUserResponseDto): void {
    this.RegisterUserVM = responseModel;
  }
}

export { RegisterPresenter };
