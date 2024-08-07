import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities/triggered-by';
// import { InvalidParameterException } from '@domain/shared/exceptions';

class FindCommentsByPostIdRequest extends UseCaseRequest {
  readonly postId: string;
  readonly pageSize: number;
  readonly pageNumber: number;

  // Constructor Section
  constructor(
    triggeredBy: TriggeredBy,
    postId: string,
    pageSize: number,
    pageNumber: number,
  ) {
    super(triggeredBy);
    this.postId = postId;
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
  }

  public static create(
    triggeredBy: TriggeredBy,
    postId: string,
    pageSize: number,
    pageNumber: number,
  ): FindCommentsByPostIdRequest {
    return new FindCommentsByPostIdRequest(
      triggeredBy,
      postId,
      pageSize,
      pageNumber,
    );
  }

  // Validate here using EnsureClass
  protected validatePayload(): void {}
}

export { FindCommentsByPostIdRequest };
