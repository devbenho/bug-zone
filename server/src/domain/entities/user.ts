import { Role } from '@domain/eums/role.enum';
import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { Nullable } from '@domain/shared/types';
import { Comment } from './comment';
import { LikePost } from './like-post';
import { LikeComment } from './like-comment';
import { LikeReply } from './like-reply';
import { Post } from './posts';
import { Reply } from './reply';

class User extends AuditableBaseEntity {

  constructor(
    public id: Nullable<string>,
    public firstName: string,
    public lastName: string,
    public email: string,
    public username: string,
    public password: string,
    public role: Role = Role.USER,
    public createdAt: Date,
    public createdBy: string,
    public updatedAt: Nullable<Date>,
    public updatedBy: Nullable<string>,
    public deletedAt: Nullable<Date>,
    public deletedBy: Nullable<string>,
    public comments: Nullable<Comment[]>,
    public likeComments: Nullable<LikeComment[]>,
    public posts: Nullable<Post[]>,
    public likedPosts: Nullable<LikePost[]>,
    public replies: Nullable<Reply[]>,
    public likeReplies: Nullable<LikeReply[]>,
  ) {
    super(
      id,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
      deletedAt,
      deletedBy,
    );
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
    role: Role = Role.USER,
    profilePicture: Nullable<string>,
    createdAt: Date,
    createdBy: string,
    updatedAt: Nullable<Date>,
    updatedBy: Nullable<string>,
    deletedAt: Nullable<Date>,
    deletedBy: Nullable<string>,
    comments: Nullable<Comment[]>,
    likeComments: Nullable<LikeComment[]>,
    posts: Nullable<Post[]>,
    likedPosts: Nullable<LikePost[]>,
    replies: Nullable<Reply[]>,
    likeReplies: Nullable<LikeReply[]>,
  ): User {
    return new User(
      id,
      firstName,
      lastName,
      email,
      username,
      password,
      role,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
      deletedAt,
      deletedBy,
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
