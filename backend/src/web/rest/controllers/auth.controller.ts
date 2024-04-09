import BaseController from './base.controller';
import { ExpressHandler } from '../infrastucture/express-handler';
import { RegisterUserRequestDto } from '@domain/dtos/requests/auth/register.dto';
import { RegisterUserResponseDto } from '@domain/dtos/responses/auth/register.dto';
import { LoginRequestDto } from '@domain/dtos/requests/auth/login.dto';
import { LoginResponseDto } from '@domain/dtos/responses/auth/login.dto';
import { LoginPresenter } from '@application/auth/login/login.presenter';
import { ILoginInputPort } from '@application/auth/login/login.input-port';
import { IRegisterInputPort } from '@application/auth/register/register.input-port';
export class AuthController implements BaseController {
  private _loginInteractor: ILoginInputPort;
  private _registerInteractor: IRegisterInputPort;
  private readonly _loginPresenter: LoginPresenter;

  constructor() {}

  public register: ExpressHandler<
    RegisterUserRequestDto,
    RegisterUserResponseDto
  > = async (req, res) => {
    const { email, password, firstName, lastName, username, phoneNumber } =
      req.body;

    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !username ||
      !phoneNumber
    ) {
      throw new Error('All fields are required');
    }

    await this._registerInteractor.execute(req.body as RegisterUserRequestDto);
    res.json(this._loginPresenter.loginVm);
  };

  public login: ExpressHandler<LoginRequestDto, LoginResponseDto> = async (
    req,
    res,
  ) => {
    const { login, password } = req.body;
    if (!login || !password) {
      throw new Error('Login and password are required');
    }
    await this._loginInteractor.execute({ login, password });
    res.json(this._loginPresenter.loginVm);
  };
}
