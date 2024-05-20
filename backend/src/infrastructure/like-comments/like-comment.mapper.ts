import { UserMapper } from '@infrastructure/users';
import { LikeCommentPersistence } from './like-comment.persistence';
import { LikeComment } from '@domain/entities/like-comment';
import { CommentMapper } from '@infrastructure/comments/comment.mapper';

class LikeCommentMapper {
  static toDomain(likeCommentPer: LikeCommentPersistence): LikeComment {
    return new LikeComment(
      likeCommentPer.commentId,
      CommentMapper.toDomain(likeCommentPer.comment),
      likeCommentPer.userId,
      UserMapper.toDomain(likeCommentPer.user),
    );
  }

  static toPersistence(likeComment: LikeComment): LikeCommentPersistence {
    return new LikeCommentPersistence(
      likeComment.userId,
      UserMapper.toPersistence(likeComment.user),
      likeComment.commentId,
      CommentMapper.toPersistence(likeComment.comment),
    );
  }
}

export { LikeCommentMapper };
