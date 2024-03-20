import { Entity, Column, ManyToOne } from "typeorm";
import BaseEntity from "./base.entity";
import User from "./user.entity";
import Reply from "./reply.entity";
@Entity()
class LikeReply extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  replyId: string;

  @ManyToOne(() => Reply)
  reply: Reply;
}

export default LikeReply;
