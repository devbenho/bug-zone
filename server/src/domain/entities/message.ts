import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { Nullable } from '@domain/shared/types';

class Message extends AuditableBaseEntity {
  constructor(
    public id: Nullable<string>,
    public userId: string,
    public chatId: string,
    public content: string,
    public read: boolean,
    public createdAt: Date,
    public createdBy: string,
    public updatedAt: Nullable<Date>,
    public updatedBy: Nullable<string>,
    public deletedAt: Nullable<Date>,
    public deletedBy: Nullable<string>,
  ) {
    super(
      id,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
      deletedAt,
      deletedBy,
    );
  }
}

export { Message };
