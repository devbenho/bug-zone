import User from "../../entities/user";
import { IBasicRepository } from "../base.repo";

export interface IUserRepository extends IBasicRepository<User> {
  getByEmail(email: string): Promise<User | undefined>;
  getByUsername(username: string): Promise<User | undefined>;
}
