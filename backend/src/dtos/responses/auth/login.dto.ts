import User from "../../../entities/user";

export type LoginResponseDto = {
  user: User;
  jwt: string;
};
