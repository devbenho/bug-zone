import { Nullable } from '@domain/types';
import { deepEqual } from 'fast-equals';
import { BaseEntity } from './base.entity';
abstract class AuditableBaseEntity extends BaseEntity {
  constructor(
    public createdAt: Date,
    public createdBy: string,
    public updatedAt: Nullable<Date>,
    public updatedBy: Nullable<string>,
    public deletedAt: Nullable<Date>,
    public deletedBy: Nullable<string>,
  ) {
    super(null);
  }
  equals(entity: AuditableBaseEntity): boolean {
    return deepEqual(this, entity);
  }
}

export { AuditableBaseEntity };
