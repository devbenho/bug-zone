import { Nullable } from '@domain/shared/types';
import { CommentResponseDto } from '@dtos/comments';
import { UserResponseDto } from '@dtos/users';
import { Comment, Post } from '@domain/entities';

export class PostResponseDto {
  constructor(
    public id: Nullable<string>,
    public title: string,
    public content: string,
    public author: UserResponseDto,
    public comments: CommentResponseDto[],
    public createdAt: Date,
    public lastModifiedAt: Nullable<Date>,
  ) { }

  public static fromEntity(entity: Post): PostResponseDto {
    return new PostResponseDto(
      entity.id,
      entity.title,
      entity.content,
      UserResponseDto.fromEntity(entity.author),
      entity.comments.map(comment => CommentResponseDto.fromEntity(comment)),
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
