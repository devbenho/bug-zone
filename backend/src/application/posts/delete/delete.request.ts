
import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities/triggered-by';
// import { InvalidParameterException } from '@domain/shared/exceptions';

class DeleteRequest extends UseCaseRequest {

  readonly postId: string;

  // Constructor Section
  constructor(
    triggeredBy: TriggeredBy,
    postId: string,
  ) {
    super(triggeredBy);
    this.postId = postId;
  }

  public static create(
    triggeredBy: TriggeredBy,
    postId: string,
  ): DeleteRequest {
    return new DeleteRequest(
      triggeredBy,
      postId,
    );
  } 

  // Validate here using EnsureClass
  protected validatePayload(): void {
  }
}

export { DeleteRequest };
