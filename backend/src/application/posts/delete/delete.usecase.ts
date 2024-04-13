import { BaseUseCase, UseCase } from '@application/shared';
import { DeleteRequest } from './delete.request';
import { PostDetailsResponseDto } from '@contracts/dtos/posts';
	
@UseCase()
class DeleteUseCase extends BaseUseCase<DeleteRequest,PostDetailsResponseDto> {

  constructor() {
	super();
  }

  public async performOperation({  }: DeleteRequest): Promise<PostDetailsResponseDto> {
	throw new Error('Method not implemented.');
  }
}

export { DeleteUseCase };