import { LOGGER } from '@/web/rest/logger';
import { Post } from '@domain/entities';
import { Nullable } from '@domain/shared/types';
import { UserResponseDto } from '@dtos/users';
import { log } from 'console';

export class PostDetailsResponseDto {
  constructor(
    public id: string,
    public title: string,
    public content: string,
    public author: UserResponseDto,
    public createdAt: Date,
    public lastModifiedAt: Nullable<Date>,
  ) {}

  public static fromEntity(entity: Post): PostDetailsResponseDto {
    return new PostDetailsResponseDto(
      entity.id ?? '',
      entity.title,
      entity.content,
      UserResponseDto.fromEntity(entity.author ?? ({} as any)),
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
