import { UseCaseRequest } from '@application/shared';
import { User } from '@domain/entities';
import { TriggeredBy, TriggeredByUser } from '@domain/shared/entities';

class CreateUserDto extends UseCaseRequest {
  constructor(
    public triggeredBy: TriggeredBy,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public username: string,
    public profilePicture?: string,
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
      throw new Error('Invalid request');
    }
  }

  public validate(): void {
    if (this.triggeredBy === null) {
      throw new Error('The usecase should be triggered by a user');
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
    return new User(
      this.firstName,
      this.lastName,
      this.email,
      this.username,
      this.password,
    );
  }
}

export { CreateUserDto };
