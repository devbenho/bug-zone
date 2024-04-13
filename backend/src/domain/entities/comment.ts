import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { User } from './user';
import { Post } from './post';

export class Comment extends AuditableBaseEntity {
  constructor(
    public postId: string,
    public post: Post,
    public userId: string,
    public author: User,
    public content: string,
  ) {
    super(new Date(), userId, new Date(), userId, null, null);
  }
}
