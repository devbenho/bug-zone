
import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities/triggered-by';
// import { InvalidParameterException } from '@domain/shared/exceptions';

class RemoveCommentRequest extends UseCaseRequest {
  readonly commentId: string;
  readonly postId: string;

  // Constructor Section
  constructor(
    triggeredBy: TriggeredBy,
    commentId: string,
    postId: string,
  ) {
    super(triggeredBy);
		this.commentId = commentId;
		this.postId = postId;
  }

  public static create(
    triggeredBy: TriggeredBy,
    commentId: string,
    postId: string,
  ): RemoveCommentRequest {
    return new RemoveCommentRequest(
      triggeredBy,
    commentId,
    postId,
    );
  } 

  // Validate here using EnsureClass
  protected validatePayload(): void {
  }
}

export { RemoveCommentRequest };
