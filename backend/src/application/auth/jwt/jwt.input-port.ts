interface JwtInputPort {
  sign: (payload: string) => string;
  verify: (token: string) => string;
}

export { JwtInputPort };
