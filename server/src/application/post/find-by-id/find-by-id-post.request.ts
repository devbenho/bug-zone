import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities/triggered-by';
// import { InvalidParameterException } from '@domain/shared/exceptions';

class FindByIdPostRequest extends UseCaseRequest {
  readonly id: string;

  // Constructor Section
  constructor(triggeredBy: TriggeredBy, id: string) {
    super(triggeredBy);
    this.id = id;
  }

  public static create(
    triggeredBy: TriggeredBy,
    id: string,
  ): FindByIdPostRequest {
    return new FindByIdPostRequest(triggeredBy, id);
  }

  // Validate here using EnsureClass
  protected validatePayload(): void {}
}

export { FindByIdPostRequest };
