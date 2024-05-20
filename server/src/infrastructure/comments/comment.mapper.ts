import CommentPersistence from '@infrastructure/comments/comment.persistence';
import { Comment } from '@/domain/entities';
import { UserMapper } from '@infrastructure/users';
import { PostMapper } from '@infrastructure/posts/post.mapper';
import { ReplyMapper } from '@infrastructure/replies/reply.mapper';
import { LikeCommentMapper } from '@infrastructure/like-comments/like-comment.mapper';

export class CommentMapper {
  public static toDomain(commentPer: CommentPersistence): Comment {
    return new Comment(
      commentPer.postId,
      PostMapper.toDomain(commentPer.post),
      commentPer.userId!,
      UserMapper.toDomain(commentPer.user),
      commentPer.content,
      commentPer.replies.map(reply => ReplyMapper.toDomain(reply)),
      commentPer.likes.map(like => LikeCommentMapper.toDomain(like)),
    );
  }

  public static toPersistence(comment: Comment): CommentPersistence {
    return new CommentPersistence(
      comment.id!,
      UserMapper.toPersistence(comment.author),
      comment.postId,
      PostMapper.toPersistence(comment.post),
      comment.content,
      comment.likes.map(like => LikeCommentMapper.toPersistence(like)),
      comment.replies.map(reply => ReplyMapper.toPersistence(reply)),
    );
  }
}
