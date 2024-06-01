import { Comment } from '@domain/entities';
import { Nullable } from '@domain/shared/types';
import { UserResponseDto } from '@dtos/users';

export class CommentResponseDto {
  constructor(
    public id: string,
    public content: string,
    public author: UserResponseDto,
    public postId: string,
    public createdAt: Nullable<Date>,
  ) {}

  public static fromEntity(entity: Comment): CommentResponseDto {
    return new CommentResponseDto(
      entity.id!,
      entity.content,
      UserResponseDto.fromEntity(entity.author as any),
      entity.postId,
      entity.createdAt,
    );
  }
}
