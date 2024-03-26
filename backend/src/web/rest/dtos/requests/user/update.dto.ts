import { User } from '@domain/entities/user';

export type UpdateUserRequestDto = Partial<Omit<User, 'password'>>;
