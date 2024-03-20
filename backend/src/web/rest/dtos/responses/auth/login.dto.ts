import User from "../../../database/entities/user";

export type LoginResponseDto = {
  user: User;
  jwt: string;
};
