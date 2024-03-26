import  {injectable} from "inversify"
import appDataSource from '@/infrastcuture/shared/presestance/data-source';
import UserPersistence from '@/infrastcuture/users/user.persistence';
import { User } from '@domain/entities';
@injectable()
export class UserRepository implements IUserRepository {
  private _userRepo = appDataSource.getRepository(UserPersistence);
  findById(id: string): Promise<UserPersistence | null> {
    const query = this._userRepo
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id.id })
      .getOne();
    return query;
  }
  async findByEmail(email: string): Promise<User> {
    const query = await  this._userRepo
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

  }
  delete(paload: string): Promise<boolean> {
    const query = this._userRepo.softDelete();
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
    return !!query;
  }
  async isUsernameExists(payload: GetUserByUsernameRequestDto): Promise<boolean> {
    const query = await this._userRepo
      .createQueryBuilder('user')
      .where('user.username = :username', { username: payload.username })
      .getOne();
    return !!query;
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