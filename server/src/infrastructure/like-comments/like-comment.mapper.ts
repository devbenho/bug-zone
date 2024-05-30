import { UserMapper } from '@infrastructure/users';
import { LikeCommentPersistence } from './like-comment.persistence';
import { LikeComment } from '@domain/entities/like-comment';
import { CommentMapper } from '@infrastructure/comments/comment.mapper';

class LikeCommentMapper {
  static async toDomain(
    likeCommentPer: LikeCommentPersistence,
  ): Promise<LikeComment> {
    const comment = await CommentMapper.toDomain(likeCommentPer.comment);
    const user = await UserMapper.toDomain(likeCommentPer.user);

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

  static toPersistence(likeComment: LikeComment): LikeCommentPersistence {
    return new LikeCommentPersistence();
  }
}

export { LikeCommentMapper };
