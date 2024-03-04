import { Application } from "express";
import { injectable, inject } from "inversify";
import asyncWrapper from "./utils/async-wrapper";
import BaseController from "./controllers/base.controller";
import { UserController } from "./controllers/user.controller";
@injectable()
export default class ApplicationRouter {
  @inject("IUserController") private userController: UserController;

  // We need to bind proper context to the controller methods
  private getController(context: BaseController, func: string) {
    return asyncWrapper((context as any)[func].bind(context));
  }

  public register(app: Application) {
    app.get("/users", this.getController(this.userController, "getAll"));
  }
}
