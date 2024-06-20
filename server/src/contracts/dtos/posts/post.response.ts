import { Nullable } from '@domain/shared/types';
import { CommentResponseDto } from '@dtos/comments';
import { UserResponseDto } from '@dtos/users';
import { Post } from '@domain/entities';

export class PostResponseDto {
  constructor(
    public id: Nullable<string>,
    public title: string,
    public content: string,
    public authorId: string,
    public author: UserResponseDto,
    public comments: CommentResponseDto[],
    public status: string,
    public createdAt: Date,
    public lastModifiedAt: Nullable<Date>,
  ) { }

  public static async fromEntity(entity: Post): Promise<PostResponseDto> {
    return new PostResponseDto(
      entity.id,
      entity.title,
      entity.content,
      entity.authorId,
      UserResponseDto.fromEntity(entity.author as any),
      entity.comments ? entity.comments.map(CommentResponseDto.fromEntity) : [],
      entity.status,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
