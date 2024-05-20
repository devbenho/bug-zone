import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import CommentPersistence from '@infrastructure/comments/comment.persistence';
import { LikeReplyPersistence } from '@infrastructure/like-replies/like-reply.persistence';
import BaseEntity from '@infrastructure/shared/persistence/entities/base.persistence';

@Entity()
class ReplyPersistence extends BaseEntity {
  @Column()
  content: string;

  @Column()
  userId: string;

  @Column()
  commentId: string;

  @OneToOne(() => CommentPersistence, comment => comment.replies, {
    lazy: true,
  })
  comment: CommentPersistence;

  @OneToMany(() => LikeReplyPersistence, like => like.reply, { lazy: true })
  likes: LikeReplyPersistence[];

  constructor(
    content: string,
    userId: string,
    commentId: string,
    comment: CommentPersistence,
  ) {
    super();
    this.content = content;
    this.userId = userId;
    this.commentId = commentId;
    this.comment = comment;
  }
}

export { ReplyPersistence };
