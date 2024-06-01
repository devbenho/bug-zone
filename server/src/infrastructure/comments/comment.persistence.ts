import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Nullable } from '@domain/shared/types';
import { UserPersistence } from '@infrastructure/users';
import { PostPersistence } from '@infrastructure/posts/post.persistence';
import { ReplyPersistence } from '@infrastructure/replies/reply.persistence';
import { LikeCommentPersistence } from '@infrastructure/like-comments/like-comment.persistence';

@Entity()
class CommentPersistence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Nullable<Date>;

  @Column()
  userId: string;

  @ManyToOne(() => UserPersistence, user => user.comments, { lazy: true })
  @JoinTable()
  user: Promise<UserPersistence>;

  @Column()
  postId: string;

  @ManyToOne(() => PostPersistence, post => post.comments, { lazy: true })
  @JoinTable()
  post: Promise<PostPersistence>;

  @Column()
  content: string;

  @OneToMany(() => LikeCommentPersistence, like => like.comment, { lazy: true })
  @JoinTable()
  likes: Promise<LikeCommentPersistence[]>;

  @OneToMany(() => ReplyPersistence, reply => reply.comment, { lazy: true })
  @JoinTable()
  replies: Promise<ReplyPersistence[]>;
}

export { CommentPersistence };
