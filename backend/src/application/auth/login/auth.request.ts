import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities';

class AuthRequestDto extends UseCaseRequest {
  protected validatePayload(): void {
    if (!this.login || !this.password) {
      throw new Error('Invalid request');
    }
  }
  private constructor(
    public triggeredBy: TriggeredBy,
    public login: string,
    public password: string,
  ) {
    super(triggeredBy);
  }
  validate(): void {
    if (this.triggeredBy === null) {
      throw new Error(`The usecase should be triggered by a user`);
    }
    this.validatePayload();
  }

  public static create(
    triggeredBy: TriggeredBy,
    login: string,
    password: string,
  ): AuthRequestDto {
    return new AuthRequestDto(triggeredBy, login, password);
  }
}

export { AuthRequestDto };
