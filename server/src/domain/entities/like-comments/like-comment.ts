import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { Nullable } from '@domain/shared/types';
import { User, Comment } from '..';

class LikeComment extends AuditableBaseEntity {
  constructor(
    public id: Nullable<string>,
    public commentId: string,
    public comment: Nullable<Comment>,
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

export { LikeComment };
