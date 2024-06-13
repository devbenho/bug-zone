import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { Nullable } from '@domain/shared/types';
import { LikeComment } from '../like-comments/like-comment';
import { Post } from '../posts';
import { LikePost } from '../like-posts';
import { Reply } from '../replies';
import { LikeReply } from '../like-replies';
import { Comment } from '../comments';

class User extends AuditableBaseEntity {
  constructor(
    public id: Nullable<string>,
    public firstName: string,
    public lastName: string,
    public email: string,
    public username: string,
    public password: string,
    public roles: string[] = ['user'],
    public createdAt: Date,
    public createdBy: string,
    public updatedAt: Nullable<Date>,
    public updatedBy: Nullable<string>,
    public comments?: Comment[],
    public likedComments?: LikeComment[],
    public posts?: Post[],
    public likedPosts?: LikePost[],
    public replies?: Reply[],
    public likedReplies?: LikeReply[],
  ) {
    super(id, createdAt, createdBy, updatedAt, updatedBy);
  }
  isPasswordMatched(password: string): boolean {
    return this.password === password;
  }

  public static create(
    id: Nullable<string>,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    roles: string[] = ['user'],
    createdAt: Date,
    createdBy: string,
    updatedAt?: Nullable<Date>,
    updatedBy?: Nullable<string>,
    comments?: Comment[],
    likeComments?: LikeComment[],
    posts?: Post[],
    likedPosts?: LikePost[],
    replies?: Reply[],
    likeReplies?: LikeReply[],
  ): User {
    return new User(
      id,
      firstName,
      lastName,
      email,
      username,
      password,
      roles,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
      comments,
      likeComments,
      posts,
      likedPosts,
      replies,
      likeReplies,
    );
  }
}

export { User };
