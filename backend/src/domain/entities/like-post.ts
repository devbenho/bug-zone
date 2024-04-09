import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { User } from './user';
import { Post } from './post';

class LikePost extends AuditableBaseEntity {
  constructor(
    public postId: string,
    public post: Post,
    public userId: string,
    public user: User,
  ) {
    super(new Date(), userId, new Date(), userId, null, null);
  }
}

export { LikePost };
