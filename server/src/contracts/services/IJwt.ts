import { Role } from "@domain/eums/role.enum";

export interface JwtPayload {
  userUuid: { value: string };
  username: { value: string };
  email: { value: string };
  roles: { value: string }[];
}
