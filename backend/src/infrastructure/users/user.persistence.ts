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
import { Reply } from '@domain/entities';
import CommentPersistence from '../comments/comment.persistence';
import { PostPersistence } from '../posts/post.persistence';
import { LikeCommentPersistence } from '@infrastructure/like-comments/like-comment.persistence';
import LikePostPersistence from '@infrastructure/like-posts/like-post.persistence';
import BaseEntity from '@infrastructure/shared/persistence/entities/base.persistence';
import { Nullable } from '@domain/types';

@Entity('users')
class UserPersistence {
  constructor(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    phoneNumber?: string,
    role: Role = Role.USER,
    profilePicture?: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.role = role;
    this.profilePicture = profilePicture;
  }

  @PrimaryGeneratedColumn('uuid')
  id: Nullable<string>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

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

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: false, default: 'user' })
  role: Role;

  @OneToMany(() => LikePostPersistence, likePost => likePost.user, {
    lazy: true,
  })
  likedPosts: Promise<LikePostPersistence[]>;

  @OneToMany(() => Reply, reply => reply.userId, { lazy: true })
  replies: Reply[];

  @OneToMany(() => CommentPersistence, comment => comment.user, { lazy: true })
  comments: CommentPersistence[];

  @OneToMany(() => PostPersistence, post => post.author, { lazy: true })
  posts: PostPersistence[];

  @OneToMany(() => PostPersistence, post => post.author, { lazy: true })
  editedPosts: PostPersistence[];

  // add likeComment
  @OneToMany(() => LikeCommentPersistence, likeComment => likeComment.user, {
    lazy: true,
  })
  likedComments: LikeCommentPersistence[];

  @Column({ nullable: true })
  profilePicture?: string;
}

export { UserPersistence };
