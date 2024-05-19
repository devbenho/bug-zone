interface IJwtService {
  sign: (payload: string) => string;
  verify: (token: string) => string;
}

export { IJwtService };
