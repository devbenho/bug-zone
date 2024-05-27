import { BaseUseCase } from '@application/shared';
import { CreatePostRequest } from './create-post.request';
import { PostDetailsResponseDto } from '@contracts/dtos/posts';
import { inject, injectable } from 'inversify';
import { TYPES } from '@infrastructure/shared/ioc/types';
import { IPostRepository } from '@domain/repositories/post.repository';
import { LOGGER } from '@/web/rest/logger';

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
    const post = CreatePostRequest.toEntity(request);
    const createdPost = await this._postRepository.createPost(post);
    LOGGER.info('Post created successfully');
    if (createdPost) {
      return PostDetailsResponseDto.fromEntity(createdPost);
    }

    return {} as PostDetailsResponseDto;
  }
}

export { CreatePostUseCase };
