import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities';
// tge chat may contains +2 users
class CreateChatRequest extends UseCaseRequest {
  constructor(
    public triggeredBy: TriggeredBy,
    public participantsIds: string[],
    public ownerId: string, // the user who created the chat
    public name?: string,
  ) {
    super(triggeredBy);
    this.validate();
  }
  protected validatePayload(): void {
    this.participantsIds.push(this.ownerId);
    if (!this.participantsIds || this.participantsIds.length < 2) {
      throw new Error('The chat should have at least two participants');
    }
    if (!this.ownerId) {
      throw new Error('The chat should have an owner');
    }
  }
  public validate(): void {
    if (!this.triggeredBy) {
      throw new Error('The use case should be triggered by a user');
    }
    this.validatePayload();
  }

  public static create(
    triggeredBy: TriggeredBy,
    owner: string, // the user who created the chat
    participants: string[],
    name?: string,
  ): CreateChatRequest {
    return new CreateChatRequest(triggeredBy, participants, owner, name);
  }
}

export { CreateChatRequest };
