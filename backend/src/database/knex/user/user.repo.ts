import { injectable } from "inversify";
import "reflect-metadata";
import User from "../../../entities/user";
import { IUserRepository } from "../../../repositories/user/user.repo";
import { LOGGER } from "../../../utils/logger";
import knex from "../knexfile";

@injectable()
export class KnexUserRepository implements IUserRepository {
  async getByEmail(email: string): Promise<User | undefined> {
    const query = knex.select("*").from<User>("users").where({ email }).first();
    return query;
  }

  async getByUsername(username: string): Promise<User | undefined> {
    const user = await knex<User>("users").where({ username }).first();
    LOGGER.error("GET BY USERNAME", user === undefined);
    if (!user) return undefined;
    return user;
  }

  async create(data: User): Promise<User> {
    await knex<User>("users").insert(data);
    return data;
  }

  async update(id: string, data: User): Promise<User> {
    const isExists = await this.exists(id);
    if (!isExists) throw new Error("User not found");
    await knex<User>("users").where({ id }).update(data);
    return data;
  }

  async delete(id: string): Promise<boolean> {
    const isExists = await this.exists(id);
    if (!isExists) throw new Error("User not found");
    // soft delete by setting deletedAt
    await knex<User>("users").where({ id }).update({ deletedAt: new Date() });
    return true;
  }

  async getById(id: string): Promise<User> {
    const user = await knex<User>("users").where({ id }).first();
    if (!user) throw new Error("User not found");
    return user;
  }

  async getAll(): Promise<User[]> {
    return await knex<User>("users");
  }

  private async exists(id: string): Promise<boolean> {
    const user = await knex<User>("users")
      .where({ id })
      .orWhere({ username: id })
      .orWhere({ email: id })
      .first();
    return !!user;
  }
}
