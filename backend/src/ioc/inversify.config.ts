import { Container } from "inversify";
import { UserService } from "../services/user/user.service.imp";
import { Knex } from "knex";
import { IUserRepository } from "../repositories/user/user.repo";
import { KnexUserRepository } from "../database/knex/user/user.repo";
import knexInstance from "../database/knex/knexfile";
import { IUserService } from "../services/user/user.service";
import { UserController } from "../controllers/user.controller";
import ApplicationRouter from "../routes";

const container = new Container();

container.bind(ApplicationRouter).to(ApplicationRouter);
container.bind<Knex>("Knex").toConstantValue(knexInstance);
container.bind<IUserService>("IUserService").to(UserService);
container.bind<IUserRepository>("IUserRepository").to(KnexUserRepository);
container.bind<UserController>("IUserController").to(UserController);
export { container };
