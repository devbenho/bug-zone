import { BaseUseCase, UseCase } from '@application/shared';
import { RemoveCommentRequest } from './remove-comment.request';
import { CommentResponseDto } from '@dtos/comments';

@UseCase()
class RemoveCommentUseCase extends BaseUseCase<RemoveCommentRequest, CommentResponseDto> {

  constructor() {
    super();
  }

  public async performOperation({}: RemoveCommentRequest): Promise<CommentResponseDto> {
    throw new Error('Method not implemented.');
  }
}

export { RemoveCommentUseCase };
