import { inject, injectable } from 'inversify';
import { User } from '@domain/entities';
import { IUserRepository } from '@contracts/repositories/user.repository';
import 'reflect-metadata ';
@injectable()
class UserRepository implements IUserRepository {
  constructor(private users: User[] = []) {}
  create(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.users.push(user);
      resolve(user);
    });
  }
  findById(id: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const user = this.users.find(user => user.id === id);
      resolve(user || null);
    });
  }
  findByEmail(email: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const user = this.users.find(user => user.email === email);
      resolve(user || null);
    });
  }
  update(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      const index = this.users.findIndex(u => u.id === user.id);
      this.users[index] = user;
      resolve(user);
    });
  }
  delete(user: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const index = this.users.findIndex(u => u.id === user.id);
      this.users.splice(index, 1);
      resolve(true);
    });
  }
  findByUsername(payload: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const user = this.users.find(user => user.username === payload);
      resolve(user || null);
    });
  }
  isEmailExists(payload: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const user = this.users.find(user => user.email === payload);
      resolve(!!user);
    });
  }
  isUsernameExists(payload: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const user = this.users.find(user => user.username === payload);
      resolve(!!user);
    });
  }
}

export { UserRepository };
