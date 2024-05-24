import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentPersistence } from '@infrastructure/comments/';
import { UserPersistence } from '@infrastructure/users';
import { LikePostPersistence } from '@infrastructure/like-posts/';
import { Nullable } from '@domain/shared/types';

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
  author: UserPersistence;

  @OneToMany(() => CommentPersistence, comment => comment.post, { lazy: true })
  comments: CommentPersistence[];

  @OneToMany(() => LikePostPersistence, likePost => likePost.post, {
    lazy: true,
  })
  likes: LikePostPersistence[];

  // add status column enum ['draft', 'published', 'deleted']
  @Column()
  status: string;
}

export { PostPersistence };
