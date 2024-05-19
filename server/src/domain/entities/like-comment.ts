import { AuditableBaseEntity } from '@domain/shared/auditable.entity';

class LikeComment extends AuditableBaseEntity {
  constructor(
    public commentId: string,
    public userId: string,
  ) {
    super(new Date(), userId, new Date(), userId, null, null);
  }
}

export { LikeComment };
