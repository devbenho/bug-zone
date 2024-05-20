import { UserPersistence } from '@infrastructure/users';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ReplyPersistence } from '@infrastructure/replies/reply.persistence';
import BaseEntity from '@infrastructure/shared/persistence/entities/base.persistence';

@Entity()
class LikeReplyPersistence extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => UserPersistence)
  user: UserPersistence;

  @Column()
  replyId: string;

  @ManyToOne(() => ReplyPersistence, reply => reply.likes, { lazy: true })
  reply: ReplyPersistence;

  constructor(
    userId: string,
    user: UserPersistence,
    replyId: string,
    reply: ReplyPersistence,
  ) {
    super();
    this.userId = userId;
    this.user = user;
    this.replyId = replyId;
    this.reply = reply;
  }
}

export { LikeReplyPersistence };
