import { TriggeredByUser } from '@domain/shared/entities';
import { AuthRequest } from '@contracts/dtos/auth';
import { LoginUseCase } from '@application/auth/login/login.use-case';
import { RegisterUsecase } from '@application/auth/register/register.use-case';
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
import { CreateUserDto } from '@contracts/dtos/users';
import {AddCommentUsecase} from "@application/comments/add-comment.use-case";

@RestController('/:starshipId/comments')
@Tags({ name: 'Comments', description: 'Add comment to the starship' })
class AuthController {
  private _addCommentUseCase: AddCommentUsecase;

  constructor(addCommentUseCase: AddCommentUsecase) {
    this._addCommentUseCase = addCommentUseCase;
  }

  @Post('/')
  @Title('Add comment')
  @Summary('Comment on a starship')
  @Description(
    'Endpoint to add a comment to a starship',
  )
  @Returns(StatusCodes.OK, UserSuccessfullyAuthenticatedApiResponse)
  @Status(StatusCodes.OK, UserSuccessfullyAuthenticatedApiResponse)
  public async addComment(
    @Example('123456') @BodyParams('text') password: string,
  ): Promise<UserSuccessfullyAuthenticatedApiResponse> {
    let triggeredBy = new TriggeredByUser(email, "");
    const authenticatedUser = await this._loginUseCase.execute(
      AuthRequest.create(triggeredBy, email, password),
    );
    return UserSuccessfullyAuthenticatedApiResponse.Create(
        authenticatedUser.userDetails.id as string,
        authenticatedUser.userDetails.email,
        authenticatedUser.userDetails.scopeId,
        authenticatedUser.token,
    );
  }

  @Post('/register')
  @Title('Register')
  @Summary('User Register')
  @Description('Endpoint to register the user')
  @Returns(StatusCodes.OK, UserSuccessfullyAuthenticatedApiResponse)
  @Status(StatusCodes.OK, UserSuccessfullyAuthenticatedApiResponse)
  public async registerUser(
    @Example('Muhammad') @BodyParams('name') name: string,
    @Example('devbenho@benho.com') @BodyParams('email') email: string,
    @Example('123456') @BodyParams('password') password: string,
    @Example('1') @BodyParams('scope') scope: string,
    
  ): Promise<UserSuccessfullyAuthenticatedApiResponse> {
    let triggeredBy = new TriggeredByUser(email, "");
    const authenticatedUser = await this._registerUseCase.execute(
      CreateUserDto.create(
        triggeredBy,
        email,
        name,
        password,
        scope,
      ),
    );
    
    return UserSuccessfullyAuthenticatedApiResponse.Create(
      authenticatedUser.userDetails.id as string,
      authenticatedUser.userDetails.email,
      authenticatedUser.userDetails.scopeId,
      authenticatedUser.token,
    );
  }
}

export { AuthController };
