import { UserDomain } from '../../../../../domain/entities/user.domain';

export type GetUserByIdRequestDto = Pick<UserDomain, 'id'>;
