import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import { JwtService } from '@infrastructure/shared/jwt/jwt.service.impl';
import { UserMapper, UserRepository } from '@infrastructure/users';
import { LoginInteractor } from '@application/auth/login/login.interactor';
import { RegisterInteractor } from '@application/auth/register/register.interactor';
import { HasherService } from '@infrastructure/shared/hasher/hasher.service';
import { AuthController } from '@/web/rest/controllers';
import ApplicationRouter from '@/web/rest/routes';

const container = new Container();
// Bind the extrernal dependencies
container.bind(TYPES.IJwtService).to(JwtService);
container.bind(TYPES.IHasherService).to(HasherService);
container.bind(TYPES.IUserMapper).to(UserMapper);

// Inject the repositories
container.bind(TYPES.IUserRepository).to(UserRepository);

// Inject input ports
container.bind(TYPES.ILoginInputPort).to(LoginInteractor);
container.bind(TYPES.IRegisterInputPort).to(RegisterInteractor);

// Bind the controllers
container.bind(TYPES.IAuthController).to(AuthController);

// Bind ApplicationRouter
container.bind<ApplicationRouter>(ApplicationRouter).to(ApplicationRouter);

export { container };
