import { User } from '@domain/entities';
import { IUserRepository } from '@domain/repositories/user.repository';
import { injectable } from 'inversify';
import { UserMapper } from './user.mapper';
import { UserPersistence } from './user.persistence';
import { DataSource, Repository } from 'typeorm'; // Import EntityManager
// Import your preferred logging library (e.g., import { logger } from 'your-logger';)

@injectable()
class UserRepository implements IUserRepository {
  private _repository: Repository<UserPersistence>;

  constructor(private readonly dataSource: DataSource) {
    this._repository = this.dataSource.getRepository(UserPersistence);
  }
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
    const persistence = await UserMapper.toPersistence(user);
    const savedUser = await this._repository.save(persistence);
    return UserMapper.toDomain(savedUser);
  }

  async updateUser(user: User): Promise<User> {
    const persistence = await UserMapper.toPersistence(user);
    const updatedUser = await this._repository.save(persistence);
    return UserMapper.toDomain(updatedUser);
  }
}

export { UserRepository };
