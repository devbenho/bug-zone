import { User } from '@domain/entities/users';

class AuthResponseDto {
  constructor(
    public token: string,
    public tokenExpiration: Date,
    public userDetails: User,
  ) {}
}

export { AuthResponseDto };
