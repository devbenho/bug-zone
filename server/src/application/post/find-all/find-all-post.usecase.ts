import { BaseUseCase, UseCase } from '@application/shared';
import { FindAllPostRequest } from './find-all-post.request';
import { PostResponseDto } from '@contracts/dtos/posts';
import { PostRepository } from '@domain/entities/posts/post.repository';
import { Logger } from '@domain/shared';

@UseCase()
class FindAllPostUseCase extends BaseUseCase<
  FindAllPostRequest,
  PostResponseDto[]
> {
  private readonly _postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    super();
    this._postRepository = postRepository;
  }
  protected async performOperation(
    request: FindAllPostRequest,
  ): Promise<PostResponseDto[]> {
    const { pageSize, pageNumber } = request;
    Logger.debug('KOOOL posts', this._postRepository);
    const posts = await this._postRepository.findAll(
      pageSize || 10,
      pageNumber || 1,
    );

    const postDtos = await Promise.all(
      posts.map(async post => {
        return await PostResponseDto.fromEntity(post);
      }),
    );
    return postDtos;
  }
}

export { FindAllPostUseCase };
