import { AuthResponse } from '@contracts/dtos/auth';
import { ILoginOutPort } from './login.out-port';
import { injectable } from 'inversify';

@injectable()
class LoginPresenter implements ILoginOutPort {
  public LoginUserVM: AuthResponse;
  presentLoginResponse(responseModel: AuthResponse): void {
    this.LoginUserVM = responseModel;
  }
}

export { LoginPresenter };
