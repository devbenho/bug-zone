import { User } from '@domain/entities';

class AuthResponse {
  constructor(
    public token: string,
    public tokenExpiration: Date,
    public refreshToken: string,
    public refreshTokenExpiration: Date,
    public userDetails: User,
  ) {}
}

export { AuthResponse };
