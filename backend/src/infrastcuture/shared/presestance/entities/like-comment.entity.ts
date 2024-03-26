import { Entity, Column, ManyToOne } from "typeorm";
import BaseEntity from "./base.entity";
import UserPersistence from "../../../users/user.persistence";
import CommentPersistence from "../../../comments/comment.persistence";
@Entity()
class LikeComment extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => UserPersistence)
  user: UserPersistence;

  @Column()
  commentId: string;

  @ManyToOne(() => CommentPersistence)
  comment: CommentPersistence;
}

export default LikeComment;
