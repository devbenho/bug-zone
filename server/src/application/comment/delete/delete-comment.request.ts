
import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities/triggered-by';
// import { InvalidParameterException } from '@domain/shared/exceptions';

class DeleteCommentRequest extends UseCaseRequest {

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
  ): DeleteCommentRequest {
    return new DeleteCommentRequest(
      triggeredBy,
      id,
    );
  } 

  // Validate here using EnsureClass
  protected validatePayload(): void {
  }
}

export { DeleteCommentRequest };
