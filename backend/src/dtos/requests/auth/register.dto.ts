import User from "../../../entities/user";

export type RegisterUserDto = Pick<
  User,
  "email" | "password" | "firstName" | "lastName" | "phoneNumber" | "role"
>;
