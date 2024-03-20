import { UserDomain } from '../../../../../domain/entities/user.domain';

export type CreateUserRequestDto = Pick<
  UserDomain,
  'firstName' | 'lastName' | 'username' | 'email' | 'password'
>;
