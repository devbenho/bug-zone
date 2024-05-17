import { BaseUseCase, UseCase } from '@application/shared';
import { GetByPostIdCommentRequest } from './get-by-post-id-comment.request';
	
@UseCase()
class GetByPostIdCommentUseCase extends BaseUseCase<GetByPostIdCommentRequest,CommentResponseDto> {

  constructor() {
	super();
  }

  public async performOperation({  }: GetByPostIdCommentRequest): Promise<CommentResponseDto> {
	throw new Error('Method not implemented.');
  }
}

export { GetByPostIdCommentUseCase };