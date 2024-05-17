import { User } from '@domain/entities/user';
import { UserPersistence } from './user.persistence';
import { injectable } from 'inversify';
@injectable()
class UserMapper {
  public static toDomain(userPersistenceModel: UserPersistence): User {
    return new User(
      userPersistenceModel.id!,
      userPersistenceModel.firstName,
      userPersistenceModel.lastName,
      userPersistenceModel.email,
      userPersistenceModel.username,
      userPersistenceModel.password,
      userPersistenceModel.profilePicture!,
    );
  }

  public static toPersistence(user: User): UserPersistence {
    return new UserPersistence(
      user.firstName,
      user.lastName,
      user.username,
      user.email,
      user.password,
      user.profilePicture,
    );
  }
}

export { UserMapper };
