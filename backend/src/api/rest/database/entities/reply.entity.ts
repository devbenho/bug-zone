import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import BaseEntity from "./base.entity";
import LikeReply from "./like-reply.entity";
import Comment from "./comment.entity";
import User from "./user.entity";

@Entity()
export default class Reply extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.replies)
  user: User;

  @Column()
  commentId: string;

  @ManyToOne(() => Comment, (comment) => comment.replies)
  comment: Comment;

  @Column()
  content: string;

  @OneToMany(() => LikeReply, (likeReply) => likeReply.reply)
  likes: LikeReply[];
}
