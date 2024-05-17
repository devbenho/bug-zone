import { BaseUseCase, UseCase } from '@application/shared';
import { CreateCommentRequest } from './create-comment.request';
	
@UseCase()
class CreateCommentUseCase extends BaseUseCase<CreateCommentRequest,CommentDetailsResponseDto> {

  constructor() {
	super();
  }

  public async performOperation({  }: CreateCommentRequest): Promise<CommentDetailsResponseDto> {
	throw new Error('Method not implemented.');
  }
}

export { CreateCommentUseCase };