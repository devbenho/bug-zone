import { Nullable } from '@domain/types';

abstract class BaseEntity {
  constructor(public id: Nullable<string>) {}
}

export { BaseEntity };
