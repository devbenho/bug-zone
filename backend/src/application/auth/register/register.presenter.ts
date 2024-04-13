import { AuthResponse } from '@contracts/dtos/auth';
import { IRegisterOutPort } from './register.out-port';
import { injectable } from 'inversify';

@injectable()
class RegisterPresenter implements IRegisterOutPort {
  public RegisterUserVM: AuthResponse;
  presentRegisterResponse(responseModel: AuthResponse): void {
    this.RegisterUserVM = responseModel;
  }
}

export { RegisterPresenter };
