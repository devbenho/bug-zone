import { Entity, Column, ManyToOne } from "typeorm";
import BaseEntity from "./base.entity";
import UserPersistence from "../../../users/user.persistence";
import Reply from "./reply.entity";
@Entity()
class LikeReply extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => UserPersistence)
  user: UserPersistence;

  @Column()
  replyId: string;

  @ManyToOne(() => Reply)
  reply: Reply;
}

export default LikeReply;
