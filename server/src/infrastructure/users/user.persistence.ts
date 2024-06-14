import {
  Entity,
  Column,
  OneToMany,
  Unique,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinTable,
} from 'typeorm';
import { CommentPersistence } from '../comments/comment.persistence';
import { PostPersistence } from '../posts/post.persistence';
import { LikeCommentPersistence } from '@infrastructure/like-comments/like-comment.persistence';
import { Nullable } from '@domain/shared/types';
import { ReplyPersistence } from '@infrastructure/replies';
import { LikeReplyPersistence } from '@infrastructure/like-replies';
import { LikePostPersistence } from '@infrastructure/like-posts';

@Entity()
class UserPersistence {
  @PrimaryGeneratedColumn('uuid')
  public id: Nullable<string>;

  @Unique('unique_username', ['username'])
  @Column({ unique: true })
  public username: string;

  @Unique('unique_email', ['email'])
  @Column({ unique: true })
  public email: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  // @BeforeInsert()
  @Column()
  public hashedPassword: string;

  @Column({ nullable: false, default: 'user' })
  public role: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Nullable<Date>;

  @DeleteDateColumn({ nullable: true })
  public deletedAt: Nullable<Date>;

  @OneToMany(() => LikePostPersistence, likePost => likePost.user)
  @JoinTable()
  public likedPosts: Promise<LikePostPersistence[]>;

  @OneToMany(() => ReplyPersistence, reply => reply.user /** {lazy: true,}*/)
  @JoinTable()
  public replies: Promise<ReplyPersistence[]>;

  @OneToMany(() => CommentPersistence, comment => comment.user)
  @JoinTable()
  public comments: Promise<CommentPersistence[]>;

  @OneToMany(() => PostPersistence, post => post.author)
  @JoinTable()
  public posts: Promise<PostPersistence[]>;

  // add likeComment
  @OneToMany(() => LikeCommentPersistence, likeComment => likeComment.user)
  @JoinTable()
  public likedComments: Promise<LikeCommentPersistence[]>;

  @OneToMany(() => LikeReplyPersistence, likePost => likePost.user)
  @JoinTable()
  public likedReplies: Promise<LikeReplyPersistence[]>;
}

export { UserPersistence };
