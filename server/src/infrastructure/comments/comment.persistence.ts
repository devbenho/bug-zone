import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
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
}

export { CommentPersistence };
