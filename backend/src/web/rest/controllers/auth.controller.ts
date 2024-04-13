import BaseController from './base.controller';
import { ExpressHandler } from '../infrastucture/express-handler';
import { AuthRequest, AuthResponse } from '@contracts/dtos/auth';
import { CreateUserDto } from '@contracts/dtos/users';
import { ILoginOutPort } from '@application/auth/login/login.out-port';
import { IRegisterOutPort } from '@application/auth/register/register.out-port';
import { inject, injectable } from 'inversify';
import { symbols } from '../ioc/symbols';
import { BaseUseCase } from '@application/shared';

@injectable()
export class AuthController implements BaseController {
  constructor(
    @inject(symbols.ILoginInputPort)
    private _loginInteractor: BaseUseCase<AuthRequest, AuthResponse>,
    @inject(symbols.ILoginOutputPort) private _loginPresenter: ILoginOutPort,
    @inject(symbols.IRegisterInputPort)
    private _registerInteractor: BaseUseCase<CreateUserDto, AuthResponse>,
    @inject(symbols.IRegisterOutputPort)
    private _registerPresenter: IRegisterOutPort,
  ) {}

  public register: ExpressHandler<CreateUserDto, AuthResponse> = async (
    req,
    res,
  ) => {
    const { email, password, firstName, lastName, username } = req.body;

    if (!email || !password || !firstName || !lastName || !username) {
      throw new Error('All fields are required');
    }

    await this._registerInteractor.execute(req.body as CreateUserDto);
    res.json(this._registerPresenter.RegisterUserVM);
  };

  public login: ExpressHandler<AuthRequest, AuthResponse> = async (
    req,
    res,
  ) => {
    const data = new AuthRequest(req.body.login!, req.body.password!);
    await this._loginInteractor.execute(data);
    res.json(this._loginPresenter.LoginUserVM);
  };
}
