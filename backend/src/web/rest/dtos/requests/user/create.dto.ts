import { User } from '@domain/entities/user';

export type CreateUserRequestDto = Pick<
  User,
  'firstName' | 'lastName' | 'username' | 'email' | 'password'
>;
