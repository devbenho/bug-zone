export class AuthResponse {
  constructor(
    token: string,
    tokenExpiration: Date,
    refreshToken: string,
    refreshTokenExpiration: Date,
    userDetails: UserDetailsDto
  ) {}
}
