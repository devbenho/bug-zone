import { Nullable } from '@domain/types';
import { UserResponseDto } from '@dtos/users';

export class CommentDetailsResponseDto {
  constructor(
    public id: string,
    public content: string,
    public author: UserResponseDto,
    public post: PostResponseDto,
    public createdAt: Nullable<Date>,
  ) {
  }
}