import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import { JwtService } from '@infrastructure/shared/jwt/jwt.service.impl';
import { UserMapper, UserRepository } from '@infrastructure/users';

import { HasherService } from '@infrastructure/shared/hasher/hasher.service';
import { AuthController } from '@/web/rest/controllers';
import ApplicationRouter from '@/web/rest/routes';
import { LoginUseCase } from '@application/auth/login/login.use-case';
import { RegisterUsecase } from '@application/auth/register/register.use-case';
import { DataSource } from 'typeorm';
import { appDataSource } from '@infrastructure/shared/persistence/data-source';

const container = new Container();
// Bind the extrernal dependencies
container.bind(TYPES.IJwtService).to(JwtService);
container.bind(TYPES.IHasherService).to(HasherService);
container.bind(TYPES.IUserMapper).to(UserMapper);

// Inject the repositories
container.bind(TYPES.IUserRepository).to(UserRepository);

// Inject input ports
container.bind(TYPES.ILoginInputPort).to(LoginUseCase);
container.bind(TYPES.IRegisterInputPort).to(RegisterUsecase);

// Bind the controllers
container.bind(TYPES.IAuthController).to(AuthController);

// Bind ApplicationRouter
container.bind<ApplicationRouter>(ApplicationRouter).to(ApplicationRouter);

// bind the datastore
container.bind<DataSource>(DataSource).toConstantValue(appDataSource);

export { container };
