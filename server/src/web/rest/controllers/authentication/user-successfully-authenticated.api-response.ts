import { CollectionOf, Email, Property } from '@tsed/schema';

class UserSuccessfullyAuthenticatedApiResponse {
  @Property()
  readonly uuid: string;

  @Property()
  readonly username: string;

  @Email()
  readonly email: string;

  @CollectionOf(String)
  readonly roles: string[];

  @Property()
  readonly token: string;

  constructor(
    uuid: string,
    username: string,
    email: string,
    roles: string[],
    token: string,
  ) {
    this.uuid = uuid;
    this.username = username;
    this.email = email;
    this.roles = roles;
    this.token = token;
  }

  public static create(
    uuid: string,
    username: string,
    email: string,
    roles: string[],
    token: string,
  ): UserSuccessfullyAuthenticatedApiResponse {
    return new UserSuccessfullyAuthenticatedApiResponse(
      uuid,
      username,
      email,
      roles,
      token,
    );
  }
}

export { UserSuccessfullyAuthenticatedApiResponse };
