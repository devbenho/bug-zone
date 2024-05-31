import 'reflect-metadata';
import {
  CreateDateColumn,
  DataSource,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { UserSubscriber } from './subscribers/user.subscribe';
import path from 'path';
import { Nullable } from '@domain/shared/types';
import { UserPersistence } from '@infrastructure/users';
import { LikePostPersistence } from '@infrastructure/like-posts';
import { LikeReplyPersistence } from '@infrastructure/like-replies';
import { PostPersistence } from '@infrastructure/posts';
import { CommentPersistence } from '@infrastructure/comments';
import { ReplyPersistence } from '@infrastructure/replies';
import { LikeCommentPersistence } from '@infrastructure/like-comments';
import { UserSubscriber } from './subscribers/user.subscribe';

// generate test typeorm entity called DemoEntity
//
@Entity()
class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @DeleteDateColumn()
  deletedAt: Nullable<Date>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    id: string,
    deletedAt: Nullable<Date>,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.deletedAt = deletedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite3',
  synchronize: true,
  entities: [
    UserPersistence,
    LikePostPersistence,
    LikeReplyPersistence,
    PostPersistence,
    CommentPersistence,
    ReplyPersistence,
    LikeCommentPersistence,
    LikeCommentPersistence,
  ],
  migrations: [path.join(__dirname, '/../migrations/**/*.{js,ts}')],
  subscribers: [UserSubscriber],
});

export { appDataSource };
