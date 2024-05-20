import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { Comment } from './comment';
import { User } from './user';

class LikeComment extends AuditableBaseEntity {
  constructor(
    public commentId: string,
    public comment: Comment,
    public userId: string,
    public user: User,
  ) {
    super(new Date(), userId, new Date(), userId, null, null);
  }
}

export { LikeComment };
