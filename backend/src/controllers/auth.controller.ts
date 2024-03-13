import { inject, injectable } from "inversify";
import { RegisterUserRequestDto } from "../dtos/requests/auth/register.dto";
import { RegisterUserResponseDto } from "../dtos/responses/auth/register.dto";
import BaseController from "./base.controller";
import { IAuthService } from "../services/auth/auth.service";
import { ExpressHandler } from "../utils/express-handler";
import { log } from "console";
@injectable()
export class AuthController implements BaseController {
  @inject("IAuthService") private _authService: IAuthService;

  public register: ExpressHandler<
    RegisterUserRequestDto,
    RegisterUserResponseDto
  > = async (req, res) => {
    const registerUserRequestDto: RegisterUserRequestDto =
      req.body as RegisterUserRequestDto;
    const createdUser = await this._authService.register(
      registerUserRequestDto
    );
    const { user, jwt } = createdUser;
    return res.status(200).json({
      success: true,
      user,
      jwt,
    });
  };
}
