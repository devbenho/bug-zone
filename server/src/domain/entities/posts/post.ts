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
    public likes: LikePost[],
    public comments: Comment[],
    public status: POST_STATUS = POST_STATUS.DRAFT,
    public createdAt: Date,
    public updatedAt: Nullable<Date>,
    public deletedAt: Nullable<Date>,
  ) {
    super(id, createdAt, authorId, updatedAt, authorId, deletedAt, authorId);
  }

  public static create(
    id: Nullable<string>,
    title: string,
    content: string,
    authorId: string,
    author: User,
    likes: LikePost[],
    comments: Comment[],
    status: POST_STATUS,
    createdAt: Date,
    updatedAt: Nullable<Date>,
    deletedAt: Nullable<Date>,
  ) {
    return new Post(
      id,
      title,
      content,
      authorId,
      author,
      likes,
      comments,
      status,
      createdAt,
      updatedAt,
      deletedAt,
    );
  }
}

export { Post };
