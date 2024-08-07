import { BaseUseCase, UseCase } from '@application/shared';
import { GetDetailCommentRequest } from './get-detail-comment.request';
import { CommentDetailsResponseDto } from '@contracts/dtos/comments';

@UseCase()
class GetDetailCommentUseCase extends BaseUseCase<
  GetDetailCommentRequest,
  CommentDetailsResponseDto
> {
  constructor() {
    super();
  }

  public async performOperation({}: GetDetailCommentRequest): Promise<CommentDetailsResponseDto> {
    throw new Error('Method not implemented.');
  }
}

export { GetDetailCommentUseCase };
