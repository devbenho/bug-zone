import { Nullable } from '@domain/shared/types';
import { Post } from '@domain/entities/posts';
import { User } from '@domain/entities/user';

class LikePost {
  id: Nullable<string>;
  postId: string;
  post: Post
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(
    id: Nullable<string>,
    postId: string,
    authorId: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
  ) {
    this.id = id;
    this.postId = postId;
    this.userId = authorId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}

export { LikePost };
