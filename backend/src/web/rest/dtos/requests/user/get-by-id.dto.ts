import { User } from '@domain/entities/user';

export type GetUserByIdRequestDto = Pick<User, 'id'>;
