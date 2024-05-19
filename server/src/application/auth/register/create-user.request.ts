import { UseCaseRequest } from '@application/shared';
import { User } from '@domain/entities';
import { TriggeredBy, TriggeredByUser } from '@domain/shared/entities';

// convert to class

class CreateUserDto extends UseCaseRequest {
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
  }

  validate(): void {
    if (this.triggeredBy === null) {
      throw new Error(`The usecase should be triggered by a user`);
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
    roles?: string[],
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
}

export { CreateUserDto };
