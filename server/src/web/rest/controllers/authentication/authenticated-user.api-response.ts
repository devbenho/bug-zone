import { Default, Email, Enum, Property } from '@tsed/schema';
import { UserRoles } from '@domain/entities/users';
import { AuthResponseDto } from '@contracts/dtos/auth';

class AuthenticatedUserApiResponse {
  @Property()
  readonly uuid: string;

  @Property()
  readonly firstName: string;

  @Property()
  readonly lastName: string;

  @Property()
  readonly username: string;

  @Email()
  readonly email: string;

  @Property()
  readonly phoneNumber: string;

  @Property()
  readonly address: string;

  @Property()
  readonly profilePicUrl: string;

  @Enum(UserRoles)
  @Default(UserRoles.USER)
  readonly roles: string[];

  constructor(
    uuid: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    roles: string[],
  ) {
    this.uuid = uuid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.roles = roles;
  }

  public static fromUserResponse(
    user: AuthResponseDto,
  ): AuthenticatedUserApiResponse {
    const userDetails = user.userDetails;
    return new AuthenticatedUserApiResponse(
      userDetails.id!, // Assuming `id` is `uuid`
      userDetails.firstName,
      userDetails.lastName,
      userDetails.username,
      userDetails.email,
      userDetails.roles,
    );
  }
}

export { AuthenticatedUserApiResponse };
