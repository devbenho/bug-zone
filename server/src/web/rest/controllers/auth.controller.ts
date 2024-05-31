import { BaseUseCase } from '@application/shared';
import BaseController from './base.controller';
import { TriggeredByUser } from '@domain/shared/entities';
import { CreateUserDto } from '@dtos/users';
import { TYPES } from '@infrastructure/shared/ioc/types';
import { inject, injectable } from 'inversify';
import { ExpressHandler } from '../infrastructure/express-handler';
import { AuthRequest, AuthResponseDto } from '@contracts/dtos/auth';

@injectable()
export class AuthController implements BaseController {
  private _loginUseCase: BaseUseCase<AuthRequest, AuthResponseDto>;
  private _registerUseCase: BaseUseCase<CreateUserDto, AuthResponseDto>;
  constructor(
    @inject(TYPES.ILoginInputPort)
    _loginInteractor: BaseUseCase<AuthRequest, AuthResponseDto>,
    @inject(TYPES.IRegisterInputPort)
    _registerInteractor: BaseUseCase<CreateUserDto, AuthResponseDto>,
  ) {
    this._loginUseCase = _loginInteractor;
    this._registerUseCase = _registerInteractor;
  }

  public register: ExpressHandler<CreateUserDto, AuthResponseDto> = async (
    req,
    res,
  ) => {
    // destructuring the request body
    const { email, password, firstName, lastName, username } = req.body;

    // preparing the request object
    const request = CreateUserDto.create(
      new TriggeredByUser(username!, []),
      firstName!,
      lastName!,
      email!,
      password!,
      username!,
    );

    // excuting the use case
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
