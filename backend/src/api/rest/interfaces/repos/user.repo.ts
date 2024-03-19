import User from '../../database/entities/user.entity';
import { CreateUserRequestDto } from '../../dtos/requests/user/create.dto';
import { DeleteUserRequestDto } from '../../dtos/requests/user/delete.dto';
import { GetUserByEmailRequestDto } from '../../dtos/requests/user/get-by-email.dto';
import { GetUserByIdRequestDto } from '../../dtos/requests/user/get-by-id.dto';
import { GetUserByUsernameRequestDto } from '../../dtos/requests/user/get-by-username.dto';
import { UpdateUserRequestDto } from '../../dtos/requests/user/update.dto';

export interface IUserRepository {
  create(user: CreateUserRequestDto): Promise<User>;
  findById(id: GetUserByIdRequestDto): Promise<User | null>;
  findByEmail(email: GetUserByEmailRequestDto): Promise<User | null>;
  update(payload: UpdateUserRequestDto): Promise<User>;
  delete(paload: DeleteUserRequestDto): Promise<boolean>; // soft delete
  // hardDelete(id: string): Promise<boolean>;
  findByUsername(payload: GetUserByUsernameRequestDto): Promise<User | null>;
  isEmailExists(payload: GetUserByEmailRequestDto): Promise<boolean>;
  isUsernameExists(payload: GetUserByUsernameRequestDto): Promise<boolean>;
}
