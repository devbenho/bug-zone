import { Role } from "../eums/role.enum";
import BaseEntity from "./base";

type User = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role?: Role;
} & BaseEntity;

export default User;
