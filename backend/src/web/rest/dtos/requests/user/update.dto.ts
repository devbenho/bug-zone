import { UserDomain } from '../../../../../domain/entities/user.domain';

export type UpdateUserRequestDto = Partial<Omit<UserDomain, 'password'>>;
