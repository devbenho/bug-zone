import { Role } from '@domain/eums/role.enum';
import {
  Entity,
  Column,
  OneToMany,
  Unique,
  BeforeInsert,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
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
  id: Nullable<string>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Nullable<Date>;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Nullable<Date>;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Unique('unique_username', ['username'])
  @Column({ unique: true })
  username: string;

  @Unique('unique_email', ['email'])
  @Column({ unique: true })
  email: string;

  @BeforeInsert()
  @Column()
  password: string;

  @Column({ nullable: false, default: 'user' })
  role: Role;

  @OneToMany(() => LikePostPersistence, likePost => likePost.user, {
    lazy: true,
  })
  likedPosts: LikePostPersistence[];

  @OneToMany(() => ReplyPersistence, reply => reply.userId, { lazy: true })
  replies: ReplyPersistence[];

  @OneToMany(() => CommentPersistence, comment => comment.user, { lazy: true })
  comments: CommentPersistence[];

  @OneToMany(() => PostPersistence, post => post.author, { lazy: true })
  posts: PostPersistence[];

  // add likeComment
  @OneToMany(() => LikeCommentPersistence, likeComment => likeComment.user, {
    lazy: true,
  })
  likedComments: LikeCommentPersistence[];

  @OneToMany(() => LikeReplyPersistence, likePost => likePost.user, {})
  likedReplies: LikeReplyPersistence[];
}

export { UserPersistence };
