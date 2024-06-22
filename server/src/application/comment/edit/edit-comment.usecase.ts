import { BaseUseCase, UseCase } from '@application/shared';
import { EditCommentRequest } from './edit-comment.request';
import { CommentDetailsResponseDto } from '@contracts/dtos/comments';

@UseCase()
class EditCommentUseCase extends BaseUseCase<
  EditCommentRequest,
  CommentDetailsResponseDto
> {
  constructor() {
    super();
  }

  public async performOperation({}: EditCommentRequest): Promise<CommentDetailsResponseDto> {
    throw new Error('Method not implemented.');
  }
}

export { EditCommentUseCase };
