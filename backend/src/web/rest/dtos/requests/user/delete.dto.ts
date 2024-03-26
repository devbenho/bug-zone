import { User } from '@domain/entities/user';

export type DeleteUserRequestDto = Pick<User, 'id'>;
