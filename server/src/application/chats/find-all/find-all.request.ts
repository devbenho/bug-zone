import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities';

class FindAllChatsRequest extends UseCaseRequest {
  constructor(public triggeredBy: TriggeredBy) {
    super(triggeredBy);
    this.validate();
  }
  protected validatePayload(): void {}

  public validate(): void {
    if (!this.triggeredBy) {
      throw new Error('The use case should be triggered by a user');
    }
    this.validatePayload();
  }

  public static create(triggeredBy: TriggeredBy): FindAllChatsRequest {
    return new FindAllChatsRequest(triggeredBy);
  }
}

export { FindAllChatsRequest };
