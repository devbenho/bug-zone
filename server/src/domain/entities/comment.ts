import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { User } from './user';
import { Post } from './posts';
import { Reply } from './reply';
import { LikeComment } from './like-comment';

export class Comment extends AuditableBaseEntity {
  constructor(
    public postId: string,
    public post: Post,
    public authorId: string,
    public author: User,
    public content: string,
    public replies: Reply[],
    public likes: LikeComment[],
  ) {
    super(new Date(), authorId, new Date(), authorId, null, null);
  }
}
