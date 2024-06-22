import { BaseUseCase, UseCase } from '@application/shared';
import { DeleteCommentRequest } from './delete-comment.request';

@UseCase()
class DeleteCommentUseCase extends BaseUseCase<DeleteCommentRequest, boolean> {
  constructor() {
    super();
  }

  public async performOperation({}: DeleteCommentRequest): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

export { DeleteCommentUseCase };
