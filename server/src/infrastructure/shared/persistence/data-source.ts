import { ChatPersistence } from '@infrastructure/chats/chat.persistence';
import { CommentPersistence } from '@infrastructure/comments';
import { LikeCommentPersistence } from '@infrastructure/like-comments';
import { LikePostPersistence } from '@infrastructure/like-posts';
import { LikeReplyPersistence } from '@infrastructure/like-replies';
import { PostPersistence } from '@infrastructure/posts';
import { ReplyPersistence } from '@infrastructure/replies';
import { UserPersistence } from '@infrastructure/users';
import path from 'path';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const SQLITE_DATASOURCE = Symbol.for('SQLITE_DATASOURCE');
export const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite3',
  synchronize: true,
  entities: [
    UserPersistence,
    PostPersistence,
    LikePostPersistence,
    CommentPersistence,
    LikeCommentPersistence,
    ReplyPersistence,
    LikeReplyPersistence,
    ChatPersistence
  ],

  migrations: [path.join(__dirname, '/../migrations/**/*.{js,ts}')],
});
