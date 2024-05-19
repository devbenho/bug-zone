import { User } from '@domain/entities';

class AuthResponseDto {
  constructor(
    public token: string,
    public tokenExpiration: Date,
    public refreshToken: string,
    public refreshTokenExpiration: Date,
    public userDetails: User,
  ) {}
}

export { AuthResponseDto };
