import { Nullable } from '@domain/types';

abstract class BaseEnity {
  constructor(public id: Nullable<string>) {}
}

export { BaseEnity };
