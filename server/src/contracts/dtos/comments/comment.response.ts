import { Comment, User } from '@domain/entities';
import { Nullable } from '@domain/shared';
import { UserResponseDto } from '@dtos/users';

export class CommentResponseDto {
  constructor(
    public id: string,
    public content: string,
    public authorId: string,
    public author: Nullable<UserResponseDto>,
    public postId: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  public static fromEntity(entity: Comment): CommentResponseDto {
    return new CommentResponseDto(
      entity.id as string,
      entity.content,
      entity.authorId,
      UserResponseDto.fromEntity(entity.author as User),
      entity.postId,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
