import { User } from '../../../../../domain/entities/user';

export type GetUserByEmailRequestDto = Pick<User, 'email'>;
