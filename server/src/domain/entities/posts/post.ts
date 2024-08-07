import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { Nullable } from '@domain/shared/types';
import { User, Comment, LikePost } from '..';

class Post extends AuditableBaseEntity {
  constructor(
    public id: Nullable<string>,
    public title: string,
    public content: string,
    public authorId: string,
    public author: Nullable<User>,
    public likes: LikePost[],
    public comments: Comment[],
    public status: string = 'draft',
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
    author: Nullable<User>,
    likes: LikePost[],
    comments: Comment[],
    status: string,
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
