import { CommentPersistence } from '@infrastructure/comments';
import { UserMapper, UserPersistence } from '@infrastructure/users';
import { PostMapper, PostPersistence } from '@infrastructure/posts';
import { ReplyMapper, ReplyPersistence } from '@infrastructure/replies';
import {
  LikeCommentMapper,
  LikeCommentPersistence,
} from '@infrastructure/like-comments';
import { Comment } from '@domain/entities';

export class CommentMapper {
  public static toDomain(
    commentPer: CommentPersistence,
    lazyEntities?: {
      user?: UserPersistence;
      post?: PostPersistence;
      replies?: ReplyPersistence[];
      likes?: LikeCommentPersistence[];
    },
  ): Comment {
    const domainReplies = (lazyEntities?.replies ?? []).map(reply =>
      ReplyMapper.toDomain(reply),
    );

    const domainLikes = (lazyEntities?.likes ?? []).map(like =>
      LikeCommentMapper.toDomain(like),
    );

    const domainUser = lazyEntities?.user
      ? UserMapper.toDomain(lazyEntities.user)
      : null;

    const domainPost = lazyEntities?.post
      ? PostMapper.toDomain(lazyEntities.post)
      : null;

    return new Comment(
      commentPer.id,
      commentPer.postId,
      domainPost,
      commentPer.userId,
      domainUser,
      commentPer.content,
      domainReplies,
      domainLikes,
      commentPer.createdAt,
      commentPer.updatedAt,
      commentPer.deletedAt,
    );
  }

  public static toPersistence(comment: Comment): CommentPersistence {
    const commentPersistence = new CommentPersistence();

    if (comment.id != null) {
      commentPersistence.id = comment.id;
    }

    commentPersistence.postId = comment.postId;
    commentPersistence.userId = comment.authorId;
    commentPersistence.content = comment.content;
    commentPersistence.createdAt = comment.createdAt;
    commentPersistence.deletedAt = comment.deletedAt;

    if (comment.author) {
      commentPersistence.user = Promise.resolve(
        UserMapper.toPersistence(comment.author),
      );
    }

    if (comment.post) {
      commentPersistence.post = Promise.resolve(
        PostMapper.toPersistence(comment.post),
      );
    }

    if (comment.replies) {
      // commentPersistence.replies = Promise.all(
      //   comment.replies.map(reply => ReplyMapper.toPersistence(reply)),
      // );
    }

    if (comment.likes) {
      commentPersistence.likes = Promise.all(
        comment.likes.map(like => LikeCommentMapper.toPersistence(like)),
      );
    }

    return commentPersistence;
  }
}
