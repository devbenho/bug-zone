import { LoginResponseDto } from '@domain/dtos/responses/auth/login.dto';
import { ILoginOutPort } from './login.out-port';

class LoginPresenter implements ILoginOutPort {
  presentLoginResponse(responseModel: LoginResponseDto): void {
    this.loginVm = responseModel;
  }
  public loginVm: LoginResponseDto;
}

export { LoginPresenter };
