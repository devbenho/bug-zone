import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => CommentPersistence, comment => comment.replies, {
    lazy: true,
  })
  @JoinTable()
  comment: Promise<CommentPersistence>;

  @ManyToOne(() => UserPersistence, user => user.replies, { lazy: true })
  @JoinTable()
  user: Promise<UserPersistence>;

  @OneToMany(() => LikeReplyPersistence, like => like.reply, { lazy: true })
  @JoinTable()
  likes: Promise<LikeReplyPersistence[]>;
}

export { ReplyPersistence };
