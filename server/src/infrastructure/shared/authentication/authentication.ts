export class Authentication {
  constructor(
    public userUuid: string,
    public username: string,
    public email: string,
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
}
