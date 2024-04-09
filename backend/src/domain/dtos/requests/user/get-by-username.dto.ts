import { User } from '@domain/entities/user';

export type GetUserByUsernameRequestDto = Pick<User, 'username'>;
