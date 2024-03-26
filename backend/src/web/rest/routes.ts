import { Application } from "express";
import { injectable, inject } from "inversify";
import asyncWrapper from "./infrastucture/async-wrapper";
import BaseController from "./controllers/base.controller";
import { UserController } from "./controllers/user.controller";
import { AuthController } from "./controllers/auth.controller";
import { symbols } from "./utils/ioc/symbols";
@injectable()
export default class ApplicationRouter {
  constructor(
    @inject(symbols.IUserController) private userController: UserController,
    @inject(symbols.IAuthController) private authController: AuthController
  ) {}
  // We need to bind proper context to the controller methods
  private getController(context: BaseController, func: string) {
    return asyncWrapper((context as any)[func].bind(context));
  }

  public register(app: Application) {
    app.get("/users", this.getController(this.userController, "getAll"));
    app.post(
      "/auth/register",
      this.getController(this.authController, "register")
    );
    app.post("/auth/login", this.getController(this.authController, "login"));
  }
}
