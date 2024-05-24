import { Nullable } from '@domain/shared/types';
import { deepEqual } from 'fast-equals';
import { BaseEntity } from './base.entity';
abstract class AuditableBaseEntity extends BaseEntity {
  constructor(
    public id: Nullable<string>,
    public createdAt: Date,
    public createdBy: string,
    public updatedAt: Nullable<Date>,
    public updatedBy: Nullable<string>,
    public deletedAt: Nullable<Date>,
    public deletedBy: Nullable<string>,
  ) {
    super(id);
  }
  equals(entity: AuditableBaseEntity): boolean {
    return deepEqual(this, entity);
  }
}

export { AuditableBaseEntity };
