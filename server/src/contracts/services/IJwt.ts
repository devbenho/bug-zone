interface IJwtService {
  sign: (payload: JwtPayload) => string;
  verify: (token: string) => JwtPayload;
}

export interface JwtPayload {
  userId: string;
}

export { IJwtService };
