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
  public role: Role;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Nullable<Date>;

  @DeleteDateColumn({ nullable: true })
  public deletedAt: Nullable<Date>;

  @OneToMany(
    () => LikePostPersistence,
    likePost => likePost.user /** {lazy: true,}*/,
  )
  public likedPosts: LikePostPersistence[];

  @OneToMany(() => ReplyPersistence, reply => reply.userId /** {lazy: true,}*/)
  public replies: ReplyPersistence[];

  @OneToMany(
    () => CommentPersistence,
    comment => comment.user /** {lazy: true,}*/,
  )
  public comments: CommentPersistence[];

  @OneToMany(() => PostPersistence, post => post.author /** {lazy: true,}*/)
  public posts: PostPersistence[];

  // add likeComment
  @OneToMany(
    () => LikeCommentPersistence,
    likeComment => likeComment.user /** {lazy: true,}*/,
  )
  public likedComments: LikeCommentPersistence[];

  @OneToMany(() => LikeReplyPersistence, likePost => likePost.user, {})
  public likedReplies: LikeReplyPersistence[];
}

export { UserPersistence };
