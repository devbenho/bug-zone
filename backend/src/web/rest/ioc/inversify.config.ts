import { Container } from 'inversify';
import { AuthController } from '../controllers/auth.controller';
import { UserController } from '../controllers/user.controller';
import ApplicationRouter from '../routes';
import { symbols } from './symbols';
import { DataSource } from 'typeorm';
import { IUserRepository } from '../../../contracts/repositories/user.repository';
import { UserRepository } from '@infrastructure/users/user.repository.impl';
import { IJwtService } from '@contracts/services/IJwt';
import { JwtService } from '@infrastructure/jwt/jwt.service.impl';
import { IHasherService } from '@contracts/services/IHasher';
import { HasherService } from '@infrastructure/hasher/hasher.service';
// import { ILoginInputPort } from '@application/auth/login/login.input-port';
import { LoginInteractor } from '@application/auth/login/login.interactor';
import { IRegisterInputPort } from '@application/auth/register/register.input-port';
import { RegisterInteractor } from '@application/auth/register/register.interactor';
import { ILoginOutPort } from '@application/auth/login/login.out-port';
import { LoginPresenter } from '@application/auth/login/login.presenter';
import { IRegisterOutPort } from '@application/auth/register/register.out-port';
import { RegisterPresenter } from '@application/auth/register/register.presenter';
const container = new Container();

container.bind(ApplicationRouter).to(ApplicationRouter);
// container.bind<IUserService>(symbols.IUserService).to(UserService);
container
  .bind<IUserRepository>(symbols.IUserRepository)
  .to(UserRepository)
  .inSingletonScope();
container.bind<IJwtService>(symbols.IJwtService).to(JwtService);
container.bind<IHasherService>(symbols.IHasherService).to(HasherService);
container.bind<UserController>(symbols.IUserController).to(UserController);
container.bind<AuthController>(symbols.IAuthController).to(AuthController);
// container.bind<ILoginInputPort>(symbols.ILoginInputPort).to(LoginInteractor);
container
  .bind<IRegisterInputPort>(symbols.IRegisterInputPort)
  .to(RegisterInteractor);
container.bind<ILoginOutPort>(symbols.ILoginOutputPort).to(LoginPresenter);
container
  .bind<IRegisterOutPort>(symbols.IRegisterOutputPort)
  .to(RegisterPresenter);
container.bind<IUserRepository>(symbols.IUserRepository).to(UserRepository);

container.bind<DataSource>(symbols.DataSource).to(DataSource);
export { container };
