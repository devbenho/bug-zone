import User from "../../database/entities/user";

export interface IUserService {
  getAll(): Promise<User[] | []>;
}
