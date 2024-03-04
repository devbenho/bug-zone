import User from "../../entities/user";

export interface IUserService {
  getAll(): Promise<User[] | []>;
}
