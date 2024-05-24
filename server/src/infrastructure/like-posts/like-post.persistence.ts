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
import { PostPersistence } from '../posts/post.persistence';
import { BaseEntity } from '@infrastructure/shared/persistence/entities/base.persistence';

@Entity()
class LikePostPersistence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  userId: string;

  @ManyToOne(() => UserPersistence)
  user: UserPersistence;

  @Column()
  postId: string;

  @ManyToOne(() => PostPersistence)
  post: PostPersistence;
}

export { LikePostPersistence };
