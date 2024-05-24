import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { Comment } from './comment';
import { User } from './user';
import { Nullable } from '@domain/shared/types';

class LikeComment extends AuditableBaseEntity {
  constructor(
    public id: Nullable<string>,
    public commentId: string,
    public comment: Comment,
    public userId: string,
    public user: User,
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

export { LikeComment };
