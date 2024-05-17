import { Nullable } from '@domain/types';
import { UserResponseDto } from '@dtos/users';
import { PostResponseDto } from '../posts';
import { RepliesResponseDto } from '../replies/replies-response.dto';

export class CommentDetailsResponseDto {
  constructor(
    public id: string,
    public content: string,
    public author: UserResponseDto,
    public post: PostResponseDto,
    public createdAt: Nullable<Date>,
    public replies: RepliesResponseDto[],
    public likes: number,
  ) {}
}
