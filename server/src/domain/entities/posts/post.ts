import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { User } from '../user';
import { LikePost } from '../like-post';
import { Comment } from '../comment';
import { Nullable } from '@domain/shared/types';
import { POST_STATUS } from '@domain/eums/post-status.enum';

class Post extends AuditableBaseEntity {
  constructor(
    public id: Nullable<string>,
    public title: string,
    public content: string,
    public authorId: string,
    public author: User,
    public likes: Nullable<LikePost[]>,
    public comments: Nullable<Comment[]>,
    public status: POST_STATUS = POST_STATUS.DRAFT,
    public createdAt: Date,
    public updatedAt: Nullable<Date>,
    public deletedAt: Nullable<Date>,
  ) {
    super(id, createdAt, authorId, updatedAt, authorId, deletedAt, authorId);
  }
}

export { Post };
