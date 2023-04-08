import { IUser } from "@bugzone/shared/types";

export interface IUserMongo extends IUser{
    _id: String,
}
