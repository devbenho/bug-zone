import { BaseUseCase } from '@application/shared';
import { TriggeredByUser } from '@domain/shared/entities';
import { CreateUserDto } from '@dtos/users';
import { TYPES } from '@infrastructure/shared/ioc/types';
import { inject, injectable } from 'inversify';
import {
  interfaces,
  controller,
  httpPost,
  request,
  response,
} from 'inversify-express-utils';
import { AuthRequest, AuthResponseDto } from '@contracts/dtos/auth';
import { ExpressHandler } from '../infrastructure/express-handler';

@controller('/auth')
export class AuthController implements interfaces.Controller {
  private _loginUseCase: BaseUseCase<AuthRequest, AuthResponseDto>;
  private _registerUseCase: BaseUseCase<CreateUserDto, AuthResponseDto>;

  constructor(
    @inject(TYPES.ILoginInputPort)
    loginInteractor: BaseUseCase<AuthRequest, AuthResponseDto>,
    @inject(TYPES.IRegisterInputPort)
    registerInteractor: BaseUseCase<CreateUserDto, AuthResponseDto>,
  ) {
    this._loginUseCase = loginInteractor;
    this._registerUseCase = registerInteractor;
  }

  public register: ExpressHandler<CreateUserDto, AuthResponseDto> = async (
    req,
    res,
  ) => {
    const { email, password, firstName, lastName, username } = req.body;

    const request = CreateUserDto.create(
      new TriggeredByUser(username!, []),
      firstName!,
      lastName!,
      email!,
      password!,
      username!,
    );

    const result = await this._registerUseCase.execute(request);

    res.json(result);
  };

  public login: ExpressHandler<AuthRequest, AuthResponseDto> = async (
    req,
    res,
  ) => {
    const { login, password } = req.body;
    const triggeredBy = new TriggeredByUser(login!, []);
    const result = await this._loginUseCase.execute(
      AuthRequest.create(triggeredBy, login!, password!),
    );
    res.json(result);
  };
}
