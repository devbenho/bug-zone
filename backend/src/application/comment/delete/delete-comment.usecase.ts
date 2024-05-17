import { BaseUseCase, UseCase } from '@application/shared';
import { DeleteCommentRequest } from './delete-comment.request';
	
@UseCase()
class DeleteCommentUseCase extends BaseUseCase<DeleteCommentRequest,bool> {

  constructor() {
	super();
  }

  public async performOperation({  }: DeleteCommentRequest): Promise<bool> {
	throw new Error('Method not implemented.');
  }
}

export { DeleteCommentUseCase };