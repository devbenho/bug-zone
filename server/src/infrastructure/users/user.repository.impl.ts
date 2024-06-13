import { User } from '@domain/entities';
import { UserMapper } from './user.mapper';
import { UserPersistence } from './user.persistence';
import { Repository } from 'typeorm'; // Import EntityManager
import { RepositoryDec } from '@infrastructure/shared/persistence/repository.decorator';
import { UserRepository } from '@domain/entities/users';
import { appDataSource } from '@infrastructure/shared/persistence/data-source';
import { Logger } from '@domain/shared';
// Import your preferred logging library (e.g., import { logger } from 'your-logger';)

@RepositoryDec({ type: UserRepository })
class UserRepositoryImp implements UserRepository {
  private _repository: Repository<UserPersistence> =
    appDataSource.getRepository(UserPersistence);

  delete(user: User): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<User | null> {
    const user = await this._repository.findOne({ where: { id } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this._repository.findOne({ where: { email } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    Logger.info('findByUsername From userRepositoryImp');
    const user = await this._repository.findOne({ where: { username } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async isEmailExists(email: string): Promise<boolean> {
    const count = await this._repository.count({ where: { email } });
    return count > 0;
  }

  async isUsernameExists(username: string): Promise<boolean> {
    const count = await this._repository.count({ where: { username } });
    return count > 0;
  }

  async saveUser(user: User): Promise<User> {
    const persistence = UserMapper.toPersistence(user);
    const savedUser = await this._repository.save(persistence);
    return UserMapper.toDomain(savedUser);
  }

  async updateUser(user: User): Promise<User> {
    const persistence = UserMapper.toPersistence(user);
    const updatedUser = await this._repository.save(persistence);
    return UserMapper.toDomain(updatedUser);
  }
}

export { UserRepositoryImp as UserRepository };
