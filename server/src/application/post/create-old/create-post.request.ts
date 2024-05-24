import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities';

class CreatePostRequestDto extends UseCaseRequest {
  protected validatePayload(): void {
    if (!this.title) {
      throw new Error('Title is required');
    }
    if (!this.content) {
      throw new Error('Content is required');
    }
  }
  private constructor(
    public triggeredBy: TriggeredBy,
    public readonly title: string,
    public readonly content: string,
  ) {
    super(triggeredBy);
  }

  public static create(
    triggeredBy: TriggeredBy,
    title: string,
    content: string,
  ): CreatePostRequestDto {
    return new CreatePostRequestDto(triggeredBy, title, content);
  }
}

export { CreatePostRequestDto };
