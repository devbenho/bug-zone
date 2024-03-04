import "reflect-metadata";
import { inject, injectable } from "inversify";
import { IUserRepository } from "../../repositories/user/user.repo";
import User from "../../entities/user";
import { IUserService } from "./user.service";
@injectable()
export class UserService implements IUserService {
  @inject("IUserRepository") private _userRepository: IUserRepository;
  async getAll(): Promise<User[] | []> {
    return await this._userRepository.getAll();
  }
}
