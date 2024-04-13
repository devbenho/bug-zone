import { BaseUseCase, UseCase } from '@application/shared';
import { UpdateRequest } from './update.request';
import { PostDetailsResponseDto } from '@contracts/dtos/posts';
	
@UseCase()
class UpdateUseCase extends BaseUseCase<UpdateRequest,PostDetailsResponseDto> {

  constructor() {
	super();
  }

  public async performOperation({  }: UpdateRequest): Promise<PostDetailsResponseDto> {
	throw new Error('Method not implemented.');
  }
}

export { UpdateUseCase };