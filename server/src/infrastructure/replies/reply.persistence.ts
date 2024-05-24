import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentPersistence } from '@infrastructure/comments/';
import { LikeReplyPersistence } from '@infrastructure/like-replies/';
import { Nullable } from '@domain/shared/types';
import { UserPersistence } from '@infrastructure/users/';

@Entity()
class ReplyPersistence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Nullable<Date>;

  @Column()
  content: string;

  @Column()
  userId: string;

  @Column()
  commentId: string;

  @ManyToOne(() => CommentPersistence, comment => comment.replies, { lazy: true })
  comment: CommentPersistence;

  @ManyToOne(() => UserPersistence, user => user.replies, { lazy: true })
  user: UserPersistence;

  @OneToMany(() => LikeReplyPersistence, like => like.reply, { lazy: true })
  likes: LikeReplyPersistence[];
}

export { ReplyPersistence };
