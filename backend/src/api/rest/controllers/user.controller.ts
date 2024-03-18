import "reflect-metadata";
import { Response } from "express";
import { inject, injectable } from "inversify";
import { IUserService } from "../services/user/user.service";
import BaseController from "./base.controller";
import { symbols } from "../../../utils/ioc/symbols";

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(symbols.IUserService) private _userService: IUserService
  ) {
    super();
  }
  public async getAll(_req: Request, res: Response) {
    const result = await this._userService.getAll();
    return res.status(200).json({
      length: result?.length,
      data: result,
    });
  }
}
