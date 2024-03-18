import User from "../database/entities/user.entity";
import { DataSource, Repository } from "typeorm";

export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder("user")
      .where("user.firstName = :firstName", { firstName })
      .andWhere("user.lastName = :lastName", { lastName })
      .getMany();
  }
  findByEmail(email: string) {
    return this.createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne();
  }
  findByUsername(username: string) {
    return this.createQueryBuilder("user")
      .where("user.username = :username", { username })
      .getOne();
  }
  findByPhoneNumber(phoneNumber: string) {
    return this.createQueryBuilder("user")
      .where("user.phoneNumber = :phoneNumber", { phoneNumber })
      .getOne();
  }
  findByRole(role: string) {
    return this.createQueryBuilder("user")
      .where("user.role = :role", { role })
      .getMany();
  }
  findByUsernameOrEmail(username: string, email: string) {
    return this.createQueryBuilder("user")
      .where("user.username = :username", { username })
      .orWhere("user.email = :email", { email })
      .getOne();
  }
  isAdmin(username: string) {
    return this.createQueryBuilder("user")
      .where("user.username = :username", { username })
      .andWhere("user.role = :role", { role: "admin" })
      .getOne();
  }
  assignRole(username: string, role: string) {
    return this.createQueryBuilder("user")
      .update(User)
      .set({
        role: () => role,
      })
      .where("username = :username", { username })
      .execute();
  }
  removeRole(username: string) {
    return this.createQueryBuilder("user")
      .update(User)
      .set({
        role: () => "user",
      })
      .where("username = :username", { username })
      .execute();
  }
}
