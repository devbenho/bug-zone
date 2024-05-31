import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities/triggered-by';
import { UploadedFiles } from '@domain/shared/models';
// import { InvalidParameterException } from '@domain/shared/exceptions';

class EditPostRequest extends UseCaseRequest {
  readonly title: string;
  readonly content: string;
  readonly attachments: UploadedFiles[];

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
    attachments: UploadedFiles[],
  ): EditPostRequest {
    return new EditPostRequest(triggeredBy, title, content, attachments);
  }

  // Validate here using EnsureClass
  protected validatePayload(): void {}
}

export { EditPostRequest };
