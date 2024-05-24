import { UserMapper } from '@infrastructure/users';
import { LikeCommentPersistence } from './like-comment.persistence';
import { LikeComment } from '@domain/entities/like-comment';
import { CommentMapper } from '@infrastructure/comments/comment.mapper';

class LikeCommentMapper {
  static toDomain(likeCommentPer: LikeCommentPersistence): LikeComment {
    return new LikeComment(
      likeCommentPer.id,
      likeCommentPer.commentId,
      CommentMapper.toDomain(likeCommentPer.comment),
      likeCommentPer.userId,
      UserMapper.toDomain(likeCommentPer.user),
      likeCommentPer.createdAt,
      likeCommentPer.userId,
      likeCommentPer.updatedAt,
      likeCommentPer.userId,
      likeCommentPer.deletedAt,
      likeCommentPer.userId,
    );
  }

  static toPersistence(likeComment: LikeComment): LikeCommentPersistence {
    return new LikeCommentPersistence();
  }
}

export { LikeCommentMapper };
