import { UserPersistence } from '@infrastructure/users';
import { Column, Entity, ManyToOne } from 'typeorm';
import CommentPersistence from '@infrastructure/comments/comment.persistence';
import BaseEntity from '@infrastructure/shared/persistence/entities/base.persistence';

@Entity()
class LikeCommentPersistence extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => UserPersistence, user => user.likedComments)
  user: UserPersistence;

  @Column()
  commentId: string;

  @ManyToOne(() => CommentPersistence, comment => comment.likes, { lazy: true })
  comment: CommentPersistence;

  constructor(
    userId: string,
    user: UserPersistence,
    commentId: string,
    comment: CommentPersistence,
  ) {
    super();
    this.userId = userId;
    this.user = user;
    this.commentId = commentId;
    this.comment = comment;
  }
}

export { LikeCommentPersistence };
