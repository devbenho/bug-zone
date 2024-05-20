import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Nullable } from '@domain/shared/types';
import { UserPersistence } from '@infrastructure/users';
import { PostPersistence } from '@infrastructure/posts/post.persistence';
import { ReplyPersistence } from '@infrastructure/replies/reply.persistence';
import { LikeCommentPersistence } from '@infrastructure/like-comments/like-comment.persistence';
import BaseEntity from '@infrastructure/shared/persistence/entities/base.persistence';

@Entity()
class CommentPersistence extends BaseEntity {
  @Column()
  userId: Nullable<string>;

  @ManyToOne(() => UserPersistence, user => user.comments, { lazy: true })
  user: UserPersistence;

  @Column()
  postId: string;

  @ManyToOne(() => PostPersistence, post => post.comments, { lazy: true })
  post: PostPersistence;

  @Column()
  content: string;

  @OneToMany(() => LikeCommentPersistence, like => like.comment, { lazy: true })
  likes: LikeCommentPersistence[];

  @OneToMany(() => ReplyPersistence, reply => reply.comment, { lazy: true })
  replies: ReplyPersistence[];

  constructor(
    userId: string,
    user: UserPersistence,
    postId: string,
    post: PostPersistence,
    content: string,
    likes: LikeCommentPersistence[],
    replies: ReplyPersistence[],
  ) {
    super();
    this.userId = userId;
    this.user = user;
    this.postId = postId;
    this.post = post;
    this.content = content;
    this.likes = likes;
    this.replies = replies;
  }
}

export default CommentPersistence;
