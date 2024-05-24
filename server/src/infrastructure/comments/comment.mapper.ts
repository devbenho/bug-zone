import { CommentPersistence } from '@infrastructure/comments';
import { Comment } from '@/domain/entities';
import { UserMapper } from '@infrastructure/users';
import { PostMapper } from '@infrastructure/posts';
import { ReplyMapper } from '@infrastructure/replies';
import { LikeCommentMapper } from '@infrastructure/like-comments';
import { LikeCommentPersistence, ReplyPersistence } from '..';

export class CommentMapper {
  public static toDomain(commentPer: CommentPersistence): Comment {
    return new Comment(
      commentPer.id,
      commentPer.postId,
      PostMapper.toDomain(commentPer.post),
      commentPer.userId as string,
      UserMapper.toDomain(commentPer.user),
      commentPer.content,
      commentPer.replies.map(reply => ReplyMapper.toDomain(reply)),
      commentPer.likes.map(like => LikeCommentMapper.toDomain(like)),
      commentPer.createdAt,
      commentPer.updatedAt,
      commentPer.deletedAt,
    );
  }

  public static toPersistence(comment: Comment): CommentPersistence {
    return new CommentPersistence();
  }
}
