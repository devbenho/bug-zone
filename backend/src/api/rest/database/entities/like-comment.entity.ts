import { Entity, Column, ManyToOne } from "typeorm";
import BaseEntity from "./base.entity";
import User from "./user.entity";
import Comment from "./comment.entity";
@Entity()
class LikeComment extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  commentId: string;

  @ManyToOne(() => Comment)
  comment: Comment;
}

export default LikeComment;
