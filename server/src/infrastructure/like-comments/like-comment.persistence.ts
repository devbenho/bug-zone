import { UserPersistence } from '@infrastructure/users';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentPersistence } from '@infrastructure/comments';
import { Nullable } from '@domain/shared/types';

@Entity()
class LikeCommentPersistence {
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

  @ManyToOne(() => UserPersistence, user => user.likedComments)
  user: UserPersistence;

  @Column()
  commentId: string;

  @ManyToOne(() => CommentPersistence, comment => comment.likes, { lazy: true })
  comment: CommentPersistence;
}

export { LikeCommentPersistence };
