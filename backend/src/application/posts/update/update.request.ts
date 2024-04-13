
import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities/triggered-by';
// import { InvalidParameterException } from '@domain/shared/exceptions';

class UpdateRequest extends UseCaseRequest {

  readonly postId: string;
  readonly title?: string;
  readonly content?: string;

  // Constructor Section
  constructor(
    triggeredBy: TriggeredBy,
    postId: string,
    title?: string,
    content?: string,
  ) {
    super(triggeredBy);
    this.postId = postId;
    this.title = title;
    this.content = content;
  }

  public static create(
    triggeredBy: TriggeredBy,
    postId: string,
    title?: string,
    content?: string,
  ): UpdateRequest {
    return new UpdateRequest(
      triggeredBy,
      postId,
      title,
      content,
    );
  } 

  // Validate here using EnsureClass
  protected validatePayload(): void {
  }
}

export { UpdateRequest };
