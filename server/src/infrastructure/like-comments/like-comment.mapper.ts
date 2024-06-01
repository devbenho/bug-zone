import { UserMapper, UserPersistence } from '@infrastructure/users';
import { LikeCommentPersistence } from './like-comment.persistence';
import { LikeComment } from '@domain/entities/like-comment';
import { CommentMapper, CommentPersistence } from '@infrastructure/comments/';
import { User } from '@domain/entities/user';
import { Comment } from '@domain/entities/comment';

class LikeCommentMapper {
  static toDomain(
    likeCommentPer: LikeCommentPersistence,
    lazyEntities?: {
      comment?: CommentPersistence;
      user?: UserPersistence;
    },
  ): LikeComment {
    const comment = lazyEntities?.comment
      ? CommentMapper.toDomain(lazyEntities.comment)
      : CommentMapper.toDomain(likeCommentPer.comment);
    const user = lazyEntities?.user
      ? UserMapper.toDomain(lazyEntities.user)
      : UserMapper.toDomain(likeCommentPer.user);

    return new LikeComment(
      likeCommentPer.id,
      likeCommentPer.commentId,
      comment,
      likeCommentPer.userId,
      user,
      likeCommentPer.createdAt,
      likeCommentPer.userId,
      likeCommentPer.updatedAt,
      likeCommentPer.userId,
      likeCommentPer.deletedAt,
      likeCommentPer.userId,
    );
  }

  static async toPersistence(
    likeComment: LikeComment,
  ): Promise<LikeCommentPersistence> {
    const likeCommentPersistence = new LikeCommentPersistence();

    if (likeComment.id != null) {
      likeCommentPersistence.id = likeComment.id;
    }
    likeCommentPersistence.commentId = likeComment.commentId;
    likeCommentPersistence.userId = likeComment.userId;
    likeCommentPersistence.createdAt = likeComment.createdAt;
    likeCommentPersistence.deletedAt = likeComment.deletedAt;

    return likeCommentPersistence;
  }
}

export { LikeCommentMapper };
