import { BaseUseCase } from '@application/shared';
import BaseController from './base.controller';
import { TriggeredByUser } from '@domain/shared/entities';
import { CreateUserDto } from '@dtos/users';
import { TYPES } from '@infrastructure/shared/ioc/types';
import { inject, injectable } from 'inversify';
import { ExpressHandler } from '../infrastructure/express-handler';
import { AuthRequest, AuthResponseDto } from '@contracts/dtos/auth';
import { registerController } from '@tsed/di';
import { RestController } from '../infrastructure/rest-controller.decorator';
import { Description, Example, Returns, Status, Summary, Tags, Title } from '@tsed/schema';
import { BodyParams, Context, Req, Res } from '@tsed/common';
import { RegisterUsecase } from '@application/auth/register/register.use-case';
import { NotImplemented } from '@tsed/exceptions';
import { StatusCodes } from 'http-status-codes';


@RestController('/auth')
@Tags({ name: 'Authentication', description: 'Login and Register' })
class AuthController {
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

  @Title('Register User')
  @Summary('User Register')
  @Description('Endpoint to perform a user register')
  @Returns(StatusCodes.OK, CreateUserDto)
  @Status(StatusCodes.OK, CreateUserDto)
  public async register(
    @Res() response: Res,
    @Context() context: Context,
    @Example('mail@example.co') @BodyParams('email') email: string,
    @Example('@#AsdQwe11233') @BodyParams('password') password: string,
    @Example('First') @BodyParams('firstName') firstName: string,
    @Example('Last') @BodyParams('lastName') lastName: string,
    @Example('username_334') @BodyParams('username') username: string,
  ): Promise<CreateUserDto> {
    const request = CreateUserDto.create(
      new TriggeredByUser(username, []),
      firstName,
      lastName,
      email,
      password,
      username,
    );

    // excuting the use case
    const result = await this._registerUseCase.execute(request);

    throw NotImplemented;
  }

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
