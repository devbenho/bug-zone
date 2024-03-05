import User from "../../../entities/user";

export type RegisterUserResponseDto = {
  success: boolean;
  data: User;
  error?: string;
};
