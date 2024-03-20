import { UserDomain } from '../../../../../domain/entities/user.domain';

export type GetUserByUsernameRequestDto = Pick<UserDomain, 'username'>;
