import User from '../../web/rest/database/entities/user.entity';
import { CreateUserRequestDto } from '../../web/rest/dtos/requests/user/create.dto';
import { DeleteUserRequestDto } from '../../web/rest/dtos/requests/user/delete.dto';
import { GetUserByEmailRequestDto } from '../../web/rest/dtos/requests/user/get-by-email.dto';
import { GetUserByIdRequestDto } from '../../web/rest/dtos/requests/user/get-by-id.dto';
import { GetUserByUsernameRequestDto } from '../../web/rest/dtos/requests/user/get-by-username.dto';
import { UpdateUserRequestDto } from '../../web/rest/dtos/requests/user/update.dto';

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
