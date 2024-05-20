import { Post, User } from '@domain/entities';
import { IUserRepository } from '@domain/repositories/user.repository';
import { injectable } from 'inversify';
import { DataSource, Repository } from 'typeorm';
import { UserMapper } from './user.mapper';
import { UserPersistence } from './user.persistence';

@injectable()
class UserRepository implements IUserRepository {
  private repository: Repository<UserPersistence>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(UserPersistence);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { username } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async isEmailExists(email: string): Promise<boolean> {
    const count = await this.repository.count({ where: { email } });
    return count > 0;
  }

  async isUsernameExists(username: string): Promise<boolean> {
    const count = await this.repository.count({ where: { username } });
    return count > 0;
  }

  async saveUser(user: User): Promise<User> {
    const persistence = UserMapper.toPersistence(user);
    const createdUser = await this.repository.save(persistence);
    return UserMapper.toDomain(createdUser);
  }

  async updateUser(user: User): Promise<User> {
    const persistence = UserMapper.toPersistence(user);
    const updatedUser = await this.repository.save(persistence);
    return UserMapper.toDomain(updatedUser);
  }

  async delete(user: User): Promise<boolean> {
    const persistence = UserMapper.toPersistence(user);
    await this.repository.remove(persistence);
    return true;
  }
}

export { UserRepository };
