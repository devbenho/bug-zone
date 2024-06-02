import { BaseUseCase } from '@application/shared';
import { CreatePostRequest } from './create-post.request';
import { inject, injectable } from 'inversify';
import { TYPES } from '@infrastructure/shared/ioc/types';
import { IPostRepository } from '@domain/repositories/post.repository';
import { LOGGER } from '@/web/rest/logger';
import { PostDetailsResponseDto } from '@contracts/dtos/posts/post-details.response';
import { log } from 'console';
import { Post } from '@domain/entities';
import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { POST_STATUS } from '@domain/eums/post-status.enum';

@injectable()
class CreatePostUseCase extends BaseUseCase<
  CreatePostRequest,
  PostDetailsResponseDto
> {
  constructor(
    @inject(TYPES.IPostRepository) private _postRepository: IPostRepository,
  ) {
    super();
  }

  public async performOperation(
    request: CreatePostRequest,
  ): Promise<PostDetailsResponseDto> {
    // Mapping requestDto to entity object
    const post: Post = {
      id: null,
      title: request.title,
      content: request.content,
      authorId: request.authorId,
      author: request.author,
      likes: [],
      comments: [],
      status: POST_STATUS.DRAFT,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
      createdBy: request.triggeredBy.who,
      updatedBy: request.triggeredBy.who,
      equals: function (entity: AuditableBaseEntity): boolean {
        return this.id === entity.id;
      },
    };
    // Creating post in database
    const createdPost = await this._postRepository.createPost(post);
    if (createdPost) {
      return PostDetailsResponseDto.fromEntity(createdPost);
    }
    return {} as PostDetailsResponseDto;
  }
}

export { CreatePostUseCase };
