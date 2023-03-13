import { IUser } from "@bugzone/shared/types";
export interface IUserDAO {
  create(user: IUser): Promise<IUser>;
  getById(id: string): Promise<IUser | undefined | null>;
  getByUsername(username: string): Promise<IUser | undefined | null>;
  getByEmail(email: string): Promise<IUser | undefined | null>;
  getAll(): Promise<IUser[]>;
  update(user: Partial<IUser>): Promise<IUser>;
  delete(id: string): Promise<IUser>;
}
