import { BaseUseCase, UseCase } from '@application/shared';
import { DeletePostRequest } from './delete-post.request';

@UseCase()
class DeletePostUseCase extends BaseUseCase<DeletePostRequest, boolean> {
  constructor() {
    super();
  }

  public async performOperation({}: DeletePostRequest): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

export { DeletePostUseCase };

