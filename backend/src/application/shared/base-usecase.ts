import { performance } from 'node:perf_hooks';

import { UseCaseRequest } from './usecase.request';
import { injectable } from 'inversify';

@injectable()
abstract class BaseUseCase<IRequest extends UseCaseRequest, IResponse> {
  public async execute(request: IRequest): Promise<IResponse> {
    try {
      const startTime = performance.now();
      request.validate();
      const response = await this.performOperation(request);
      const endTime = performance.now();
      const useCaseExecutionTime = endTime - startTime;
      return response;
    } catch (error) {
      throw error;
    }
  }
  protected abstract performOperation(request: IRequest): Promise<IResponse>;
}

export { BaseUseCase };
