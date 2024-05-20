import { UseCaseRequest } from '@application/shared';
import { User } from '@domain/entities';
import { TriggeredBy } from '@domain/shared/entities';

class CreatePostRequestDto extends UseCaseRequest {
  private constructor(
    public triggeredBy: TriggeredBy,
    public authorId: string,
    public title: string,
    public content: string,
    public author: User,
  ) {
    super(triggeredBy);
  }
  protected validatePayload(): void {
    if (!this.title) {
      throw new Error('Title is required');
    }
    if (!this.content) {
      throw new Error('Content is required');
    }
    if (!this.authorId) {
      throw new Error('Tags are required');
    }
  }

  public validate(): void {
    if (!this.triggeredBy) {
      throw new Error('The usecase must be triggered by someone');
    }
    this.validatePayload();
  }

  static create(
    triggeredBy: TriggeredBy,
    title: string,
    content: string,
    authorId: string,
    author: User,
  ): CreatePostRequestDto {
    {
      return new CreatePostRequestDto(
        triggeredBy,
        title,
        content,
        authorId,
        author,
      );
    }
  }
}
export { CreatePostRequestDto };
