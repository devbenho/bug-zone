import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities/triggered-by';
import { UploadedFiles } from '@domain/shared/models';
import { InvalidParameterException } from '@domain/shared/exceptions';

class CreatePostRequest extends UseCaseRequest {
  readonly title: string;
  readonly content: string;
  readonly authorId: string;
  // readonly author: User;
  readonly attachments: UploadedFiles[];
  readonly status: string;

  constructor(
    triggeredBy: TriggeredBy,
    title: string,
    content: string,
    authorId: string,
    // author: User,
    attachments: UploadedFiles[],
    status: string = 'draft',
  ) {
    super(triggeredBy);
    this.title = title;
    this.content = content;
    // this.author = author;
    this.authorId = authorId;
    this.attachments = attachments;
    this.status = status;
  }

  public static create(
    triggeredBy: TriggeredBy,
    title: string,
    content: string,
    authorId: string,
    // author: User,
    attachments: UploadedFiles[],
    status: string = 'draft',
  ): CreatePostRequest {
    return new CreatePostRequest(
      triggeredBy,
      title,
      content,
      authorId,
      // author,
      attachments,
      status,
    );
  }

  // Validate here using EnsureClass
  protected validatePayload(): void {
    if (!this.title || !this.content || !this.triggeredBy.who || !this.authorId || !this.attachments || !this.status) {
      throw new InvalidParameterException('Invalid request');
    }
  }
}

export { CreatePostRequest };
