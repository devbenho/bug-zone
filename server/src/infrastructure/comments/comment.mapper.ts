import { CommentPersistence } from '@infrastructure/comments';
import { Comment } from '@/domain/entities';
import { UserMapper } from '@infrastructure/users';
import { PostMapper } from '@infrastructure/posts';
import { ReplyMapper } from '@infrastructure/replies';
import { LikeCommentMapper } from '@infrastructure/like-comments';

export class CommentMapper {
  public static async toDomain(
    commentPer: CommentPersistence,
  ): Promise<Comment> {
    const replies = await Promise.all(
      commentPer.replies.map(reply => ReplyMapper.toDomain(reply)),
    );
    const likes = await Promise.all(
      commentPer.likes.map(like => LikeCommentMapper.toDomain(like)),
    );

    return new Comment(
      commentPer.id,
      commentPer.postId,
      await PostMapper.toDomain(commentPer.post),
      commentPer.userId,
      await UserMapper.toDomain(commentPer.user),
      commentPer.content,
      replies,
      likes,
      commentPer.createdAt,
      commentPer.updatedAt,
      commentPer.deletedAt,
    );
  }

  public static async toPersistence(
    comment: Comment,
  ): Promise<CommentPersistence> {
    const commentPersistence = new CommentPersistence();

    if (comment.id != null) {
      commentPersistence.id = comment.id;
    }
    commentPersistence.postId = comment.postId;
    commentPersistence.userId = comment.authorId;
    commentPersistence.content = comment.content;
    commentPersistence.createdAt = comment.createdAt;
    commentPersistence.deletedAt = comment.deletedAt;
    commentPersistence.replies = await Promise.all(
      comment.replies.map(reply => ReplyMapper.toPersistence(reply)),
    );
    commentPersistence.likes = await Promise.all(
      comment.likes.map(like => LikeCommentMapper.toPersistence(like)),
    );
    commentPersistence.post = await PostMapper.toPersistence(comment.post);
    commentPersistence.user = await UserMapper.toPersistence(comment.author);

    return commentPersistence;
  }
}
