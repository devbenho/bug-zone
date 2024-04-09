import { AuditableBaseEntity } from '@domain/shared/auditable.entity';

class Reply extends AuditableBaseEntity {
  constructor(
    public commentId: string,
    public userId: string,
    public content: string,
  ) {
    super(new Date(), userId, new Date(), userId, null, null);
  }
}

export { Reply };
