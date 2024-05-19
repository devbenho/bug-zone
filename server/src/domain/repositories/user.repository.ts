import { User } from '@domain/entities';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(user: User): Promise<User>;
  delete(user: User): Promise<boolean>; // soft delete
  // hardDelete(id: string): Promise<boolean>;
  findByUsername(payload: string): Promise<User | null>;
  isEmailExists(payload: string): Promise<boolean>;
  isUsernameExists(payload: string): Promise<boolean>;
}
