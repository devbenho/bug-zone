import { IUser } from "@bugzone/shared/types";
export interface IUserDAO {
  createUser(user: IUser): Promise<void>;
  getUserById(id: string): Promise<IUser | undefined | null>;
  getUserByUsername(username: string): Promise<IUser | undefined | null>;
  getUserByEmail(email: string): Promise<IUser | undefined | null>;
  updateUser(user: Partial<IUser>): Promise<IUser>;
  deleteUser(id: string): Promise<IUser>;
  getAllUsers(): Promise<IUser[]>;
}
