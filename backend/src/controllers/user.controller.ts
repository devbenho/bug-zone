import "reflect-metadata";
import { Response } from "express";
import { inject, injectable } from "inversify";
import { IUserService } from "../services/user/user.service";
import BaseController from "./base.controller";

@injectable()
export class UserController extends BaseController {
  @inject("IUserService") private _userService: IUserService;

  public async getAll(req: Request, res: Response) {
    const result = await this._userService.getAll();
    // apply pagination, filtering, sorting, etc.

    return res.status(200).json({
      length: result?.length,
      data: result,
    });
  }
}
