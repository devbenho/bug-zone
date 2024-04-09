import { BaseEnity } from '@domain/shared/base.entity';
import { Nullable } from '@domain/types';
import { deepEqual } from 'fast-equals';
abstract class AuditableBaseEntity extends BaseEnity {
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
