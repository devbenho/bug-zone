import { BaseUseCase } from '@application/shared';
import { inject, injectable } from 'inversify';
import { TYPES } from '@infrastructure/shared/ioc/types';
import { IPostRepository } from '@domain/repositories/post.repository';
import { LOGGER } from '@/web/rest/logger';
import { PostDetailsResponseDto } from '@contracts/dtos/posts/post-details.response';
import { log } from 'console';
import { Post } from '@domain/entities';
import { CreatePostRequest } from './create-post.request';
import { Post } from '@domain/entities';

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

    const post = Post.create(
      null,
      request.title,
      request.content,
      request.authorId,
      request.author,
      [],
      [],
      request.status,
      new Date(),
      null,
      null,
    );

    const createdPost = await this._postRepository.createPost(post);

    log('created post is', createdPost);

    if (createdPost) {
      return PostDetailsResponseDto.fromEntity(createdPost);
    }
    return {} as PostDetailsResponseDto;
  }
}

export { CreatePostUseCase };
