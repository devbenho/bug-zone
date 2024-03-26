import { User } from "@domain/entities/user";


export class UserMapper {

  public static toDomain(userPersistenceModel: UserPersistance): User {
    return new User();
  }

  public static toPersistence(user: User): UserPersistance {

    return new UserPersistance();
  }

}