import { Nullable } from '@domain/shared/types';
import { Post } from '@domain/entities/posts';
import { User } from '@domain/entities/user';
import { AuditableBaseEntity } from '@domain/shared/auditable.entity';

class LikePost extends AuditableBaseEntity {
  constructor(
    public id: Nullable<string>,
    public postId: string,
    public post: Nullable<Post>,
    public userId: string,
    public user: Nullable<User>,
    public createdAt: Date,
    public createdBy: string,
    public updatedAt: Nullable<Date>,
    public updatedBy: Nullable<string>,
    public deletedAt: Nullable<Date>,
    public deletedBy: Nullable<string>,
  ) {
    super(id, createdAt, createdBy, updatedAt, updatedBy, deletedAt, deletedBy);
  }
}

export { LikePost };
