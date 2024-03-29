import CommentPersistence from '@/infrastcuture/comments/comment.persistence';
import { Comment } from '@/domain/entities';
import { UserMapper } from '@/infrastcuture/users';
import { PostMapper } from '@/infrastcuture/posts/post.mapper';

export class CommentMapper {
  public static toDomain(commentPer: CommentPersistence): Comment {
    return new Comment(
      commentPer.id,
      commentPer.content,
      commentPer.userId,
      UserMapper.toDomain(commentPer.user),
      commentPer.postId,
      PostMapper.toDomain(commentPer.post),
      commentPer.createdAt,
      commentPer.updatedAt,
      commentPer.deletedAt,
    );
  }

  public static toPersistence(comment: Comment): CommentPersistence {
    return new CommentPersistence(
      comment.id,
      comment.content,
      comment.postId,
      comment.userId,
      comment.createdAt,
      comment.updatedAt,
      comment.deletedAt,
    );
  }