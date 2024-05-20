import { Nullable } from '@domain/shared/types';

abstract class BaseEntity {
  constructor(public id: Nullable<string>) { }
}

export { BaseEntity };
