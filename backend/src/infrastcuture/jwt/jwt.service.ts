export interface IJwtService {
  sign: (payload: PayloadObj) => string;
  verify: (token: string) => PayloadObj;
}

export type PayloadObj = {
  userId: string;
};
