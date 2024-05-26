import { BaseUseCase, UseCase } from '@application/shared';
import { FindAllPostRequest } from './find-all-post.request';
import { PostResponseDto } from '@contracts/dtos/posts';

@UseCase()
class FindAllPostUseCase extends BaseUseCase<
  FindAllPostRequest,
  PostResponseDto
> {
  constructor() {
    super();
  }

  public async performOperation({}: FindAllPostRequest): Promise<PostResponseDto> {
    throw new Error('Method not implemented.');
  }
}

export { FindAllPostUseCase };

