
import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities/triggered-by';
// import { InvalidParameterException } from '@domain/shared/exceptions';

class DeletePostRequest extends UseCaseRequest {

  readonly id: string;

  // Constructor Section
  constructor(
    triggeredBy: TriggeredBy,
    id: string,
  ) {
    super(triggeredBy);
    this.id = id;
  }

  public static create(
    triggeredBy: TriggeredBy,
    id: string,
  ): DeletePostRequest {
    return new DeletePostRequest(
      triggeredBy,
      id,
    );
  } 

  // Validate here using EnsureClass
  protected validatePayload(): void {
  }
}

export { DeletePostRequest };
