import User from "../../../entities/user";

export type RegisterUserRequestDto = Pick<
  User,
  "email" | "password" | "firstName" | "lastName" | "phoneNumber" | "role"
>;
