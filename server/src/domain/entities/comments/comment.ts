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
    public updatedAt: Date,
    public deletedAt: Nullable<Date>,
  ) {
    super(id, createdAt, authorId, updatedAt, authorId, deletedAt, authorId);
  }

  public static create(
    id: Nullable<string>,
    postId: string,
    post: Nullable<Post>,
    authorId: string,
    author: Nullable<User>,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Nullable<Date>,
    replies?: Reply[],
    likes?: LikeComment[],
  ): Comment {
    return new Comment(
      id,
      postId,
      post,
      authorId,
      author,
      content,
      replies || [],
      likes || [],
      createdAt,
      updatedAt,
      deletedAt,
    );
  }
}
