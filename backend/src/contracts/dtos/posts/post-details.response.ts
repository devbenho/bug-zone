import { Nullable } from "@domain/types";
import { UserResponseDto } from '@dtos/users';

export class PostDetailsResponseDto {
  constructor(
    public id: string,
    public title: string,
    public content: string,
    public author: UserResponseDto,
    public createdAt: Date,
    public lastModifiedAt: Nullable<Date>,
  ){}
}