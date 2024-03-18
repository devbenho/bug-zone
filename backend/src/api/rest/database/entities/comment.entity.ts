import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import BaseEntity from "./base.entity";
import User from "./user.entity";
import Post from "./post.entity";
import LikeComment from "./like-comment.entity";
import Reply from "./reply.entity";
@Entity()
class Comment extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Column()
  postId: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @Column()
  content: string;

  @Column()
  noLikes: number;

  @OneToMany(() => LikeComment, (like) => like.comment)
  likes: LikeComment[];

  @OneToMany(() => Reply, (reply) => reply.comment)
  replies: Reply[];
}

export default Comment;
