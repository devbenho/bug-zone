import { UseCaseRequest } from '@application/shared';
import { Post, User } from '@domain/entities';
import { POST_STATUS } from '@domain/eums/post-status.enum';
import { TriggeredBy } from '@domain/shared/entities/triggered-by';
import { UploadedFiles } from '@domain/shared/models';
import { InvalidParameterException } from '@domain/shared/exceptions';

class CreatePostRequest extends UseCaseRequest {
  readonly title: string;
  readonly content: string;
  readonly authorId: string;
  readonly author: User;
  readonly attachments: UploadedFiles[];
  readonly status: POST_STATUS;

  // Constructor Section
  constructor(
    triggeredBy: TriggeredBy,
    title: string,
    content: string,
    attachments: UploadedFiles[],
  ) {
    super(triggeredBy);
    this.title = title;
    this.content = content;
    this.attachments = attachments;
  }

  public static create(
    triggeredBy: TriggeredBy,
    title: string,
    content: string,
    authorId: string,
    author: User,
    attachments: UploadedFiles[],
    status: POST_STATUS = POST_STATUS.DRAFT,
  ): CreatePostRequest {
    return new CreatePostRequest(
      triggeredBy,
      title,
      content,
      authorId,
      author,
      attachments,
      status,
    );
  }

  // Validate here using EnsureClass
  protected validatePayload(): void {
    if (!this.title || !this.content || !this.authorId || !this.author) {
      throw new InvalidParameterException('Invalid request');
    }
  }
}

export { CreatePostRequest };
