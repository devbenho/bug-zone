import { Nullable } from '@domain/types';
import { CommentResponseDto } from '@dtos/comments';
import { UserResponseDto } from '@dtos/users';
import { Post } from '@domain/entities';

export class PostResponseDto {
  constructor(
    public id: Nullable<string>,
    public title: string,
    public content: string,
    public author: UserResponseDto,
    public comments: CommentResponseDto[],
    public createdAt: Date,
    public lastModifiedAt: Nullable<Date>,
  ) {
  }

  public static fromEntity(entity: Post): PostResponseDto {
   return new PostResponseDto(
      entity.id,
      entity.title,
      entity.content,
      UserResponseDto.fromEntity(entity.author),
      entity.comments.map(CommentResponseDto.fromEntity),
      entity.createdAt,
      entity.updatedAt,
   );
  }
}