import { Role } from '@domain/eums/role.enum';
import { Entity, Column, OneToMany, Unique, BeforeInsert } from 'typeorm';
import BaseEntity from '../shared/presestance/entities/base.entity';
import LikePostPersistence from '../LikePosts/like-post.persistence';
import Reply from '../shared/presestance/entities/reply.entity';
import { PostPersistence } from '../posts/post.persistence';
import CommentPersistence from '../comments/comment.persistence';

@Entity()
class UserPersistence extends BaseEntity {
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

  @OneToMany(() => Reply, reply => reply.user)
  replies: Reply[];

  @OneToMany(() => CommentPersistence, comment => comment.user)
  comments: CommentPersistence[];

  @OneToMany(() => PostPersistence, post => post.author)
  posts: PostPersistence[];

  @OneToMany(() => PostPersistence, post => post.author)
  editedPosts: PostPersistence[];
}

export default UserPersistence;
