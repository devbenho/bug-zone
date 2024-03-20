
import { IUserRepository } from '../../../contracts/repositories/user.repository';
import { inject, injectable } from 'inversify';
import { DeleteUserRequestDto } from '../dtos/requests/user/delete.dto';
import { GetUserByEmailRequestDto } from '../dtos/requests/user/get-by-email.dto';
import { GetUserByIdRequestDto } from '../dtos/requests/user/get-by-id.dto';
import { GetUserByUsernameRequestDto } from '../dtos/requests/user/get-by-username.dto';
import { CreateUserRequestDto } from '../dtos/requests/user/create.dto';
import { UpdateUserRequestDto } from '../dtos/requests/user/update.dto';
import appDataSource from '../database/data-source';
import User from '../database/entities/user.entity';

@injectable()
export class UserRepository implements IUserRepository {
  private _userRepo = appDataSource.getRepository(User);
  findById(id: GetUserByIdRequestDto): Promise<User | null> {
    const query = this._userRepo
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id.id })
      .getOne();
    return query;
  }
  findByEmail(email: GetUserByEmailRequestDto): Promise<User | null> {
    const query = this._userRepo
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    return query;
  }
  delete(paload: DeleteUserRequestDto): Promise<boolean> {
    const query = this._userRepo.softDelete(paload.id);
    if (!query) throw new Error('User not deleted');
    return query.then(res => res.affected === 1);
  }
  findByUsername(payload: GetUserByUsernameRequestDto): Promise<User | null> {
    const query = this._userRepo
      .createQueryBuilder('user')
      .where('user.username = :username', { username: payload.username })
      .getOne();
    return query;
  }
  async isEmailExists(payload: GetUserByEmailRequestDto): Promise<boolean> {
    const query = await this._userRepo
      .createQueryBuilder('user')
      .where('user.email = :email', { email: payload.email })
      .getOne();
    return query ? true : false;
  }
  async isUsernameExists(payload: GetUserByUsernameRequestDto): Promise<boolean> {
    const query = await this._userRepo
      .createQueryBuilder('user')
      .where('user.username = :username', { username: payload.username })
      .getOne();
    return query ? true : false;
  }

  async create(user: CreateUserRequestDto): Promise<User> {
    const query = (await this._userRepo.createQueryBuilder('user').insert().values(user).execute())
      .identifiers[0];
    if (!query) throw new Error('User not created');
    return this._userRepo.findOne(query) as Promise<User>;
  }
  async update(user: UpdateUserRequestDto): Promise<User> {
    const query = await this._userRepo
      .createQueryBuilder('user')
      .update(User)
      .set(user as any)
      .where('id = :id', { id: user.id })
      .execute();
    if (!query) throw new Error('User not updated');
    return (await this._userRepo
      .createQueryBuilder('user')
      .where('id = :id', { id: user.id })
      .getOne()) as User;
  }
}