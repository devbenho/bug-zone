import { UserMapper, UserPersistence } from '@infrastructure/users';
import { LikeCommentPersistence } from './like-comment.persistence';
import { LikeComment } from '@domain/entities/like-comment';
import { CommentMapper, CommentPersistence } from '@infrastructure/comments/';

class LikeCommentMapper {
  static toDomain(
    likeCommentPer: LikeCommentPersistence,
    lazyEntities?: {
      comment?: CommentPersistence;
      user?: UserPersistence;
    },
  ): LikeComment {
    const domainComment = lazyEntities?.comment
      ? CommentMapper.toDomain(lazyEntities.comment)
      : null;
    const domainAuthor = lazyEntities?.user
      ? UserMapper.toDomain(lazyEntities.user)
      : null;

    return new LikeComment(
      likeCommentPer.id,
      likeCommentPer.commentId,
      domainComment,
      likeCommentPer.userId,
      domainAuthor,
      likeCommentPer.createdAt,
      likeCommentPer.userId,
      likeCommentPer.updatedAt,
      likeCommentPer.userId,
      likeCommentPer.deletedAt,
      likeCommentPer.userId,
    );
  }

  static toPersistence(likeComment: LikeComment): LikeCommentPersistence {
    const likeCommentPersistence = new LikeCommentPersistence();

    if (likeComment.id) {
      likeCommentPersistence.id = likeComment.id;
    }
    likeCommentPersistence.commentId = likeComment.commentId;
    likeCommentPersistence.userId = likeComment.userId;
    likeCommentPersistence.createdAt = likeComment.createdAt;
    likeCommentPersistence.deletedAt = likeComment.deletedAt;

    if (likeComment.user) {
      likeCommentPersistence.user = Promise.resolve(
        UserMapper.toPersistence(likeComment.user),
      );
    }

    if (likeComment.comment) {
      likeCommentPersistence.comment = Promise.resolve(
        CommentMapper.toPersistence(likeComment.comment),
      );
    }
    return likeCommentPersistence;
  }
}

export { LikeCommentMapper };
