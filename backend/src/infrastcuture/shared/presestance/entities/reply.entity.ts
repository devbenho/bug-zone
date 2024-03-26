import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from './base.entity';
import LikeReply from './like-reply.entity';
import CommentPersistence from '../../../comments/comment.persistence';
import UserPersistence from '../../../users/user.persistence';

@Entity()
export default class Reply extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => UserPersistence, user => user.replies)
  user: UserPersistence;

  @Column()
  commentId: string;

  @ManyToOne(() => CommentPersistence, comment => comment.replies)
  comment: CommentPersistence;

  @Column()
  content: string;

  @OneToMany(() => LikeReply, likeReply => likeReply.reply)
  likes: LikeReply[];
}
