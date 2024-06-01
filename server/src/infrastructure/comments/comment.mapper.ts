import { CommentPersistence } from '@infrastructure/comments';
import { Comment } from '@/domain/entities';
import { UserMapper, UserPersistence } from '@infrastructure/users';
import { PostMapper, PostPersistence } from '@infrastructure/posts';
import { ReplyMapper, ReplyPersistence } from '@infrastructure/replies';
import {
  LikeCommentMapper,
  LikeCommentPersistence,
} from '@infrastructure/like-comments';

export class CommentMapper {
  public static toDomain(
    commentPer: CommentPersistence,
    lazyEntities?: {
      author?: UserPersistence;
      user?: PostPersistence;
      replies?: ReplyPersistence[];
      likes?: LikeCommentPersistence[];
    },
  ): Comment {
    const replies = lazyEntities?.replies
      ? lazyEntities.replies.map(reply => ReplyMapper.toDomain(reply))
      : [];
    const likes = lazyEntities?.likes
      ? lazyEntities.likes.map(like => LikeCommentMapper.toDomain(like))
      : [];

    const author = lazyEntities?.user
      ? UserMapper.toDomain(lazyEntities.author as UserPersistence)
      : null;

    return new Comment(
      commentPer.id,
      commentPer.postId,
      PostMapper.toDomain(commentPer.post),
      commentPer.userId,
      UserMapper.toDomain(commentPer.user),
      commentPer.content,
      replies,
      likes,
      commentPer.createdAt,
      commentPer.updatedAt,
      commentPer.deletedAt,
    );
  }

  public static toPersistence(comment: Comment): Promise<CommentPersistence> {
    const commentPersistence = new CommentPersistence();

    if (comment.id != null) {
      commentPersistence.id = comment.id;
    }

    return Promise.resolve(commentPersistence);
  }
}
