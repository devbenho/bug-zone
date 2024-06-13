import { TriggeredByUser } from '@domain/shared/entities';
import { AuthRequest, AuthResponseDto } from '@contracts/dtos/auth';
import { LoginUseCase } from '@application/auth/login/login.use-case';
// import { RegisterUsecase } from '@application/auth/register/register.use-case';
import {
  Description,
  Example,
  Post,
  Returns,
  Status,
  Summary,
  Tags,
  Title,
} from '@tsed/schema';
import { StatusCodes } from 'http-status-codes';
import { BodyParams } from '@tsed/common';
import { RestController } from '@web/rest/infrastructure/rest-controller.decorator';
import { UserSuccessfullyAuthenticatedApiResponse } from './user-successfully-authenticated.api-response';

@RestController('/auth')
@Tags({ name: 'Authentication', description: 'Login and register users' })
class AuthController {
  private _loginUseCase: LoginUseCase;
  // private _registerUseCase: RegisterUsecase;

  constructor(loginUseCase: LoginUseCase) {
    this._loginUseCase = loginUseCase;
    // this._registerUseCase = registerUseCase;
  }

  @Post('/login')
  @Title('Login')
  @Summary('User login')
  @Description(
    'Endpoint to perform a user login to obtain access token and refresh token',
  )
  @Returns(StatusCodes.OK, UserSuccessfullyAuthenticatedApiResponse)
  @Status(StatusCodes.OK, UserSuccessfullyAuthenticatedApiResponse)
  public async authenticateUser(
    @Example('janedoe') @BodyParams('username') username: string,
    @Example('123456') @BodyParams('password') password: string,
  ): Promise<UserSuccessfullyAuthenticatedApiResponse> {
    let triggeredBy = new TriggeredByUser(username, []);
    const authenticatedUser = await this._loginUseCase.execute(
      AuthRequest.create(triggeredBy, username, password),
    );

    return UserSuccessfullyAuthenticatedApiResponse.create(
      authenticatedUser.userDetails.id as string,
      username,
      authenticatedUser.userDetails.email,
      authenticatedUser.userDetails.roles,
      authenticatedUser.token,
    );
  }
}

export { AuthController };
