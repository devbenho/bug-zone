import { Entity, Column, ManyToOne } from 'typeorm';
import BaseEntity from './base.entity';
import Reply from './reply.entity';
import { UserPersistence } from '.';
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
