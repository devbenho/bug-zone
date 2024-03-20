import { UserDomain } from '../../../../../domain/entities/user.domain';

export type GetUserByEmailRequestDto = Pick<UserDomain, 'email'>;
