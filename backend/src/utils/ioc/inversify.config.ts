import { Container, decorate, injectable } from "inversify";
import { AuthController } from "../../api/rest/controllers/auth.controller";
import { UserController } from "../../api/rest/controllers/user.controller";
import ApplicationRouter from "../../routes";
import { AuthService, IAuthService } from "../../api/rest/services";
import { IJwtService } from "../../api/rest/services/jwt/jwt.service";
import { JwtService } from "../../api/rest/services/jwt/jwt.service.impl";
import { IUserService } from "../../api/rest/services/user/user.service";
import { UserService } from "../../api/rest/services/user/user.service.imp";
import { symbols } from "./symbols";
const container = new Container();

container.bind(ApplicationRouter).to(ApplicationRouter);
container.bind<IUserService>(symbols.IUserService).to(UserService);
container.bind<IJwtService>(symbols.IJwtService).to(JwtService);

container.bind<IAuthService>(symbols.IAuthService).to(AuthService);
container.bind<UserController>(symbols.IUserController).to(UserController);
container.bind<AuthController>(symbols.IAuthController).to(AuthController);
export { container };
