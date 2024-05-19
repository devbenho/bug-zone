import { AuditableBaseEntity } from '@domain/shared/auditable.entity';

class LikeReply extends AuditableBaseEntity {
  constructor(
    public replyId: string,
    public userId: string,
  ) {
    super(new Date(), userId, new Date(), userId, null, null);
  }
}

export { LikeReply };
