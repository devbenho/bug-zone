import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { Nullable } from '@domain/shared/types';
import { Post } from '../posts';
import { Reply, User } from '..';
import { LikeComment } from '../like-comments';

export class Comment extends AuditableBaseEntity {
  constructor(
    public id: Nullable<string>,
    public postId: string,
    public post: Nullable<Post>,
    public authorId: string,
    public author: Nullable<User>,
    public content: string,
    public replies: Reply[],
    public likes: LikeComment[],
    public createdAt: Date,
    public updatedAt: Nullable<Date>,
    public deletedAt: Nullable<Date>,
  ) {
    super(id, createdAt, authorId, updatedAt, authorId, deletedAt, authorId);
  }
}
