import { Comment, Reply, User } from '@domain/entities';
import { ReplyPersistence } from './reply.persistence';
import { CommentMapper } from '@infrastructure/comments/comment.mapper';
import { LikeReplyMapper } from '@infrastructure/like-replies/like-reply.mapper';
import { UserMapper } from '@infrastructure/users/user.mapper';
import { CommentPersistence } from '@infrastructure/comments/comment.persistence';
import { UserPersistence } from '@infrastructure/users/user.persistence';
import { LikeReplyPersistence } from '@infrastructure/like-replies/like-reply.persistence';
import { Nullable } from '@domain/shared/types';

class ReplyMapper {
  static toDomain(
    reply: ReplyPersistence,
    lazyEntities?: {
      comment?: CommentPersistence;
      user?: UserPersistence;
      likes?: LikeReplyPersistence[];
    },
  ): Reply {
    const domainComment = (lazyEntities?.comment ?? null) as Nullable<Comment>;
    const domainUser = (lazyEntities?.user ?? null) as Nullable<User>;
    const domainLikes = lazyEntities?.likes
      ? lazyEntities.likes.map(like => LikeReplyMapper.toDomain(like))
      : [];

    return new Reply(
      reply.id,
      reply.commentId,
      domainComment,
      reply.userId,
      domainUser,
      reply.content,
      domainLikes,
      reply.createdAt,
      reply.userId,
      reply.updatedAt,
      reply.userId,
      reply.deletedAt,
      reply.userId,
    );
  }

  static toPersistence(reply: Reply): ReplyPersistence {
    const replyPersistence = new ReplyPersistence();

    if (reply.id != null) {
      replyPersistence.id = reply.id;
    }
    replyPersistence.commentId = reply.commentId;
    replyPersistence.userId = reply.userId;
    replyPersistence.content = reply.content;
    replyPersistence.createdAt = reply.createdAt;
    replyPersistence.deletedAt = reply.deletedAt;
    if (reply.comment) {
      replyPersistence.comment = Promise.resolve(
        CommentMapper.toPersistence(reply.comment),
      );
    }
    if (reply.user) {
      replyPersistence.user = Promise.resolve(
        UserMapper.toPersistence(reply.user),
      );
    }

    if (reply.likes) {
      replyPersistence.likes = Promise.all(
        reply.likes.map(like => LikeReplyMapper.toPersistence(like)),
      );
    }

    return replyPersistence;
  }
}

export { ReplyMapper };
