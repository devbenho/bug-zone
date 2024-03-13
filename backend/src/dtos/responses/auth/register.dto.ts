import User from "../../../entities/user";

export type RegisterUserResponseDto = {
  user: User;
  jwt: string;
};
