import { AuditableBaseEntity } from "@domain/shared/auditable.entity";
import { Nullable } from "@domain/shared/types";

class Notification extends AuditableBaseEntity {
  constructor(
    public id: Nullable<string>,
    public message: string,
    public userId: string,
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

export { Notification };
