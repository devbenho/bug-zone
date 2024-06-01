import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { Reply } from './reply';
import { User } from './user';
import { Nullable } from '@domain/shared/types';

class LikeReply extends AuditableBaseEntity {
  constructor(
    public id: Nullable<string>,
    public replyId: string,
    public reply: Nullable<Reply>,
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

export { LikeReply };
