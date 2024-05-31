import { BaseUseCase } from '@application/shared';
import { FindAllPostRequest } from './find-all-post.request';
import { PostResponseDto } from '@contracts/dtos/posts';
import { TYPES } from '@infrastructure/shared/ioc/types';
import { IPostRepository } from '@domain/repositories/post.repository';
import { inject } from 'inversify';
import { log } from 'console';

class FindAllPostUseCase extends BaseUseCase<
  FindAllPostRequest,
  PostResponseDto[]
> {
  constructor(
    @inject(TYPES.IPostRepository)
    private readonly _postRepository: IPostRepository,
  ) {
    super();
  }

  public async performOperation(
    request: FindAllPostRequest,
  ): Promise<PostResponseDto[]> {
    const { pageSize, pageNumber } = request;
    const posts = await this._postRepository.findAll(pageSize, pageNumber);
    log('posts from use-case', posts);
    const postDtos = await Promise.all(
      posts.map(async post => {
        return await PostResponseDto.fromEntity(post);
      }),
    );

    return postDtos;
  }
}

export { FindAllPostUseCase };
