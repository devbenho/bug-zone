
import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities/triggered-by';
// import { InvalidParameterException } from '@domain/shared/exceptions';

class EditCommentRequest extends UseCaseRequest {

  readonly content: string;

  // Constructor Section
  constructor(
    triggeredBy: TriggeredBy,
    content: string,
  ) {
    super(triggeredBy);
    this.content = content;
  }

  public static create(
    triggeredBy: TriggeredBy,
    content: string,
  ): EditCommentRequest {
    return new EditCommentRequest(
      triggeredBy,
      content,
    );
  } 

  // Validate here using EnsureClass
  protected validatePayload(): void {
  }
}

export { EditCommentRequest };
