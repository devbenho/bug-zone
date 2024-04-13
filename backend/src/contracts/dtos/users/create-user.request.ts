import { User } from '@domain/entities';

// convert to class

class CreateUserDto {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public username: string,
    public profilePicture?: string,
  ) {}

  validate(): void {
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
}

export { CreateUserDto };
