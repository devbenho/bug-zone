import { BaseUseCase, UseCase } from '@application/shared';
import { EditPostRequest } from './edit-post.request';
import { PostDetailsResponseDto } from '@contracts/dtos/posts';

@UseCase()
class EditPostUseCase extends BaseUseCase<
  EditPostRequest,
  PostDetailsResponseDto
> {
  constructor() {
    super();
  }

  public async performOperation({}: EditPostRequest): Promise<PostDetailsResponseDto> {
    throw new Error('Method not implemented.');
  }
}

export { EditPostUseCase };

