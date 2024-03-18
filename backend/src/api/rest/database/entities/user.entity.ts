import { Role } from "../../../../utils/eums/role.enum";
import { Entity, Column, OneToMany, Unique, BeforeInsert } from "typeorm";
import BaseEntity from "./base.entity";
import LikePost from "./like-post.entity";
import Reply from "./reply.entity";
import Post from "./post.entity";
import Comment from "./comment.entity";

@Entity()
class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Unique("unique_username", ["username"])
  @Column({ unique: true })
  username: string;

  @Unique("unique_email", ["email"])
  @Column({ unique: true })
  email: string;

  @BeforeInsert()
  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: false, default: "user" })
  role: Role;

  @OneToMany(() => LikePost, (likePost) => likePost.user)
  likedPosts: LikePost[];

  @OneToMany(() => Reply, (reply) => reply.user)
  replies: Reply[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}

export default User;
