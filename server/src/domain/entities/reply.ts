import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { Comment } from './comment';
import { LikeReply } from './like-reply';
import { Nullable } from '@domain/shared/types';
import { User } from './user';

class Reply extends AuditableBaseEntity {
  constructor(
    public id: Nullable<string>,
    public commentId: string,
    public comment: Comment,
    public userId: string,
    public user: User,
    public content: string,
    public likes: Nullable<LikeReply[]>,
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

export { Reply };
