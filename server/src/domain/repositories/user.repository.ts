import { User } from '@domain/entities';
import { Nullable } from '@domain/shared/types';

export interface IUserRepository {
  saveUser(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  delete(user: User): Promise<boolean>; // soft delete
  // hardDelete(id: string): Promise<boolean>;
  findByUsername(payload: string): Promise<User | null>;
  isEmailExists(payload: string): Promise<boolean>;
  isUsernameExists(payload: string): Promise<boolean>;
  updateUser(user: User): Promise<User>;
  findById(id: string): Promise<Nullable<User>>;
}
