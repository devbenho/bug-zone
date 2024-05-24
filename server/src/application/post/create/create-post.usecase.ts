import { BaseUseCase, UseCase } from '@application/shared';
import { CreatePostRequest } from './create-post.request';
import { PostDetailsResponseDto } from '@contracts/dtos/posts';

@UseCase()
class CreatePostUseCase extends BaseUseCase<
  CreatePostRequest,
  PostDetailsResponseDto
> {
  constructor() {
    super();
  }

  public async performOperation({}: CreatePostRequest): Promise<PostDetailsResponseDto> {
    throw new Error('Method not implemented.');
  }
}

export { CreatePostUseCase };

