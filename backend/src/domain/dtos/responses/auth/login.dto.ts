import { User } from '@domain/entities';

export type LoginResponseDto = {
  user: User;
  token: string;
  error?: string;
};
