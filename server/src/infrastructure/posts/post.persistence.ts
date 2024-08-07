import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { CommentPersistence } from '@infrastructure/comments/';
import { UserPersistence } from '@infrastructure/users';
import { LikePostPersistence } from '@infrastructure/like-posts/';
import { Nullable } from '@domain/shared/types';
import { Default } from '@tsed/schema';

@Entity()
class PostPersistence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Nullable<Date>;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  authorId: string;

  @ManyToOne(() => UserPersistence, user => user.posts, { lazy: true })
  @JoinTable()
  author: Promise<UserPersistence>;

  @OneToMany(() => CommentPersistence, comment => comment.post, { lazy: true })
  @JoinTable()
  comments: Promise<CommentPersistence[]>;

  @OneToMany(() => LikePostPersistence, likePost => likePost.post, {
    lazy: true,
  })
  @JoinTable()
  likes: Promise<LikePostPersistence[]>;

  // add status column enum ['draft', 'published', 'deleted']
  @Column()
  @Default('draft')
  status: string;
}

export { PostPersistence };
