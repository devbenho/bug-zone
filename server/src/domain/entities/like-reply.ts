import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { Reply } from './reply';
import { User } from './user';

class LikeReply extends AuditableBaseEntity {
  constructor(
    public replyId: string,
    public reply: Reply,
    public userId: string,
    public user: User,
  ) {
    super(new Date(), userId, new Date(), userId, null, null);
  }
}

export { LikeReply };
