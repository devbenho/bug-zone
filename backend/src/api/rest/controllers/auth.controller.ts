import { inject, injectable } from "inversify";
import { RegisterUserRequestDto } from "../dtos/requests/auth/register.dto";
import { RegisterUserResponseDto } from "../dtos/responses/auth/register.dto";
import BaseController from "./base.controller";
import { IAuthService } from "../services/auth/auth.service";
import { ExpressHandler } from "../../../utils/express-handler";
import { symbols } from "../../../utils/ioc/symbols";
import { LoginResponseDto } from "../dtos/responses/auth/login.dto";
import { LoginRequestDto } from "../dtos/requests/auth/login.dto";
@injectable()
export class AuthController implements BaseController {
  constructor(
    @inject(symbols.IAuthService) private _authService: IAuthService
  ) {}

  public register: ExpressHandler<
    RegisterUserRequestDto,
    RegisterUserResponseDto
  > = async (req, res) => {
    const registerUserRequestDto = req.body as RegisterUserRequestDto;
    const createdUser = await this._authService.register(
      registerUserRequestDto
    );
    const { userId, jwt } = createdUser;
    return res.status(200).json({
      success: true,
      userId,
      jwt,
    });
  };

  public login: ExpressHandler<LoginRequestDto, LoginResponseDto> = async (
    req,
    res
  ) => {
    const loginRequestDto = req.body as LoginRequestDto;
    const { user, jwt } = await this._authService.login(loginRequestDto);

    return res.status(200).json({
      success: true,
      user,
      jwt,
    });
  };
}
