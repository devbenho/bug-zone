import { User } from '@domain/entities';

export type RegisterUserRequestDto = Omit<
  User,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
