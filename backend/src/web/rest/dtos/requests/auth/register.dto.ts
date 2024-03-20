import User from "../../../database/entities/user.entity";

export type RegisterUserRequestDto = Pick<
  User,
  "email" | "password" | "firstName" | "lastName" | "phoneNumber" | "username"
>;
