import { UseCaseRequest } from '@application/shared';
import { TriggeredBy, TriggeredByUser } from '@domain/shared/entities';
import { User } from '@domain/entities';

class CreateUserDto extends UseCaseRequest {
  constructor(
    public triggeredBy: TriggeredBy,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public username: string,
    public profilePicture?: string,
    public roles: string[] = ['user'],
  ) {
    super(triggeredBy);
    this.validate();
  }

  protected validatePayload(): void {
    if (
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !this.password ||
      !this.username
    ) {
      throw new Error('Invalid request: Missing required fields');
    }
  }

  public validate(): void {
    if (!this.triggeredBy) {
      throw new Error('The use case should be triggered by a user');
    }
    this.validatePayload();
  }

  public static create(
    triggeredBy: TriggeredByUser,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    username: string,
    profilePicture?: string,
  ): CreateUserDto {
    return new CreateUserDto(
      triggeredBy,
      firstName,
      lastName,
      email,
      password,
      username,
      profilePicture,
    );
  }

  public toEntity(): User {
    return User.create(
      null,
      this.firstName,
      this.lastName,
      this.email,
      this.username,
      this.password,
      this.roles,
      new Date(),
      this.triggeredBy.who,
    );
  }
}

export { CreateUserDto };
