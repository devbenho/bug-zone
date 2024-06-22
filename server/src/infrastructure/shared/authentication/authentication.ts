import { Nullable } from '@domain/shared';

export class Authentication {
  constructor(
    public userUuid: Nullable<string>,
    public username: Nullable<string>,
    public email: Nullable<string>,
    public roles: string[],
  ) {}

  public static create(
    userUuid: string,
    username: string,
    email: string,
    roles: string[],
  ): Authentication {
    return new Authentication(userUuid, username, email, roles);
  }

  public static createEmpty(): Authentication {
    return new Authentication(null, null, null, []);
  }
}
