import { UserDomain } from '../../../../../domain/entities/user.domain';

export type DeleteUserRequestDto = Pick<UserDomain, 'id'>;
