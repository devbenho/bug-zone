import { Role } from '@domain/eums/role.enum';
import { Entity, Column, OneToMany, Unique, BeforeInsert } from 'typeorm';
import LikePostPersistence from '../LikePosts/like-post.persistence';
import { Reply } from '@domain/entities';
import CommentPersistence from '../comments/comment.persistence';
import { PostPersistence } from '../posts/post.persistence';
import BaseEntity from '../shared/presestance/entities/base.entity';

@Entity()
class UserPersistence extends BaseEntity {
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
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.role = role;
    this.profilePicture = profilePicture;
  }
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

  @OneToMany(() => LikePostPersistence, likePost => likePost.user)
  likedPosts: LikePostPersistence[];

  @OneToMany(() => Reply, reply => reply.userId)
  replies: Reply[];

  @OneToMany(() => CommentPersistence, comment => comment.user)
  comments: CommentPersistence[];

  @OneToMany(() => PostPersistence, post => post.author)
  posts: PostPersistence[];

  @OneToMany(() => PostPersistence, post => post.author)
  editedPosts: PostPersistence[];

  @Column({ nullable: true })
  profilePicture?: string;
}

export { UserPersistence };
