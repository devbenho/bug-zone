import { injectable } from "inversify";
import "reflect-metadata";
import { IUserService } from "./user.service";
import appDataSource from "../../database/data-source";
import { Repository } from "typeorm";
import User from "../../database/entities/user.entity";
@injectable()
export class UserService implements IUserService {
  private _userRepository: Repository<User> = appDataSource.getRepository(User);

  async getAll(): Promise<User[] | []> {
    return await this._userRepository.find();
  }
}
