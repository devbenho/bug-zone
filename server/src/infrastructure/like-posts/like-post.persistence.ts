import { UserPersistence } from '@infrastructure/users';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostPersistence } from '../posts/post.persistence';

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
  @JoinTable()
  user: Promise<UserPersistence>;

  @Column()
  postId: string;

  @ManyToOne(() => PostPersistence)
  @JoinTable()
  post: Promise<PostPersistence>;
}

export { LikePostPersistence };
