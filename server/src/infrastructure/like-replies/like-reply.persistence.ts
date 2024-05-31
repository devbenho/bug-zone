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
import { ReplyPersistence } from '@infrastructure/replies/reply.persistence';
import { Nullable } from '@domain/shared/types';

@Entity()
class LikeReplyPersistence {
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

  @ManyToOne(() => UserPersistence)
  user: UserPersistence;

  @Column()
  replyId: string;

  @ManyToOne(() => ReplyPersistence, reply => reply.likes, { lazy: true })
  reply: Promise<ReplyPersistence>;
}

export { LikeReplyPersistence };
