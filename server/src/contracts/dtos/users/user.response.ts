import { User } from '@domain/entities';

export class UserResponseDto {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public username: string,
    public email: string,
    public pictureProfile?: string,
  ) {}

  public static fromEntity(entity: User): UserResponseDto {
    return new UserResponseDto(
      entity.id!,
      entity.firstName,
      entity.lastName,
      entity.profilePicture,
      entity.email,
      entity.username,
    );
  }
}
