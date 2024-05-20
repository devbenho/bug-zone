import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { Comment } from './comment';
import { LikeReply } from './like-reply';

class Reply extends AuditableBaseEntity {
  constructor(
    public commentId: string,
    public userId: string,
    public content: string,
    public comment: Comment,
    public likes: LikeReply[],
  ) {
    super(new Date(), userId, new Date(), userId, null, null);
  }
}

export { Reply };
