import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../shared/persistence/entities/base.entity';
import LikeComment from '../shared/persistence/entities/like-comment.entity';
import Reply from '../shared/persistence/entities/reply.entity';
import { Nullable } from '@domain/types';
import { UserPersistence } from '@infrastructure/users';
import { PostPersistence } from '@infrastructure/posts/post.persistence';

@Entity()
class CommentPersistence extends BaseEntity {
  @Column()
  userId: Nullable<string>;

  @ManyToOne(() => UserPersistence, user => user.comments)
  user: UserPersistence;

  @Column()
  postId: string;

  @ManyToOne(() => PostPersistence, post => post.comments)
  post: PostPersistence;

  @Column()
  content: string;

  @Column()
  noLikes: number;

  @OneToMany(() => LikeComment, like => like.comment)
  likes: LikeComment[];

  @OneToMany(() => Reply, reply => reply.comment)
  replies: Reply[];

  constructor(
    id: Nullable<string>,
    userId: string,
    user: UserPersistence,
    postId: string,
    post: PostPersistence,
    content: string,
    noLikes: number,
    likes: LikeComment[],
    replies: Reply[],
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  ) {
    super();
    this.id = id;
    this.userId = userId;
    this.user = user;
    this.postId = postId;
    this.post = post;
    this.content = content;
    this.noLikes = noLikes;
    this.likes = likes;
    this.replies = replies;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}

export default CommentPersistence;
