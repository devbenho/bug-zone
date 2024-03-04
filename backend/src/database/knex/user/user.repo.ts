import "reflect-metadata";
import { Knex } from "knex";
import User from "../../../entities/user";
import { IUserRepository } from "../../../repositories/user/user.repo";
import { inject, injectable } from "inversify";

@injectable()
export class KnexUserRepository implements IUserRepository {
  constructor(@inject("Knex") private knex: Knex) {}
  async getByEmail(email: string): Promise<User | undefined> {
    const user = this.knex("users").where({ email }).first();
    if (!user) throw new Error("User not found");
    return user.first();
  }
  async getByUsername(username: string): Promise<User | undefined> {
    const user = this.knex<User>("users").where({ username });
    if (!user) throw new Error("User not found");
    return user.first();
  }
  async create(data: User): Promise<User> {
    const isExists = await this.exists(data.id);
    if (isExists) throw new Error("User already exists");
    return this.knex<User>("users")
      .insert(data)
      .then(() => data);
  }
  async update(id: string, data: User): Promise<User> {
    const isExists = await this.exists(id);
    if (!isExists) throw new Error("User not found");
    return this.knex<User>("users").where({ id }).update(data);
  }
  async delete(id: string): Promise<boolean> {
    const isExists = await this.exists(id);
    if (!isExists) throw new Error("User not found");
    // soft delete by setting deletedAt
    return this.knex<User>("users")
      .where({ id })
      .insert({ deletedAt: new Date() });
  }
  async getById(id: string): Promise<User> {
    const user = await this.knex("users").where({ id }).first();
    if (!user) throw new Error("User not found");
    return user;
  }
  async getAll(): Promise<User[]> {
    return await this.knex.select().from("users");
  }
  private async exists(id: string): Promise<boolean> {
    const user = await this.knex<User>("users")
      .where({ id: id } || { username: id } || { email: id })
      .first();
    return !!user;
  }
}
