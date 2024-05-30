import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities/triggered-by';
import { InvalidParameterException } from '@domain/shared/exceptions';

class FindAllPostRequest extends UseCaseRequest {
  readonly pageSize: number;
  readonly pageNumber: number;

  // Constructor Section
  constructor(triggeredBy: TriggeredBy, pageSize: number, pageNumber: number) {
    super(triggeredBy);
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
  }

  public static create(
    triggeredBy: TriggeredBy,
    pageSize: number,
    pageNumber: number,
  ): FindAllPostRequest {
    return new FindAllPostRequest(triggeredBy, pageSize, pageNumber);
  }

  // Validate here using EnsureClass
  protected validatePayload(): void {
    if (this.pageSize <= 0) {
      throw new InvalidParameterException('Page size must be greater than 0');
    }

    if (this.pageNumber <= 0) {
      throw new InvalidParameterException('Page number must be greater than 0');
    }
  }
}

export { FindAllPostRequest };
