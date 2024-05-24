import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { Nullable } from '@domain/shared/types';

class Chat extends AuditableBaseEntity {
  constructor(
    public id: Nullable<string>,
    public ownerId: string,
    public participants: string[],
    public createdAt: Date,
    public createdBy: string,
    public updatedAt: Date,
    public updatedBy: string,
    public deletedAt: Date,
    public deletedBy: string,

  ) {
    super(id, createdAt, createdBy, updatedAt, updatedBy, deletedAt, deletedBy);
  }
}

export { Chat };
