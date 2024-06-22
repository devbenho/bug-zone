import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities/triggered-by';

class CreateCommentRequest extends UseCaseRequest {
  readonly postId: string;
  readonly content: string;

  // Constructor Section
  constructor(triggeredBy: TriggeredBy, postId: string, content: string) {
    super(triggeredBy);
    this.postId = postId;
    this.content = content;
  }

  public static create(
    triggeredBy: TriggeredBy,
    postId: string,
    content: string,
  ): CreateCommentRequest {
    return new CreateCommentRequest(triggeredBy, postId, content);
  }

  protected validatePayload(): void {
    if (!this.postId || !this.content || !this.triggeredBy) {
      throw new Error('Invalid request payload provided');
    }
  }
}

export { CreateCommentRequest };
