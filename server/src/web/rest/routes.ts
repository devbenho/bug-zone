import 'reflect-metadata';
import { TYPES } from '@infrastructure/shared/ioc/types';
import { Application } from 'express';
import { inject, injectable } from 'inversify';
import { AuthController } from './controllers/auth.controller';
import BaseController from './controllers/base.controller';
import asyncWrapper from './infrastucture/async-wrapper';

@injectable()
export default class ApplicationRouter {
  constructor(
    @inject(TYPES.IAuthController) private authController: AuthController,
  ) {}
  // We need to bind proper context to the controller methods
  private getController(context: BaseController, func: string) {
    return asyncWrapper((context as any)[func].bind(context));
  }

  public register(app: Application) {
    app.post(
      '/auth/register',
      this.getController(this.authController, 'register'),
    );
    app.post('/auth/login', this.getController(this.authController, 'login'));
  }
}
