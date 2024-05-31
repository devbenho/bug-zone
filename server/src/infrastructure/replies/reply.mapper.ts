import { Reply } from '@domain/entities';
import { ReplyPersistence } from './reply.persistence';
import { CommentMapper } from '@infrastructure/comments/comment.mapper';
import { LikeReplyMapper } from '@infrastructure/like-replies/like-reply.mapper';
import { UserMapper } from '..';

class ReplyMapper {
  static async toDomain(reply: ReplyPersistence): Promise<Reply> {
    const comment = await CommentMapper.toDomain(reply.comment);
    const user = await UserMapper.toDomain(reply.user);
    const likes = await Promise.all(
      (reply.likes ?? []).map(like => LikeReplyMapper.toDomain(like)),
    );

    return new Reply(
      reply.id,
      reply.commentId,
      comment,
      reply.userId,
      user,
      reply.content,
      likes,
      reply.createdAt,
      reply.userId,
      reply.updatedAt,
      reply.userId,
      reply.deletedAt,
      reply.userId,
    );
  }

  static async toPersistence(reply: Reply): Promise<ReplyPersistence> {
    const replyPersistence = new ReplyPersistence();
    if (reply.id != null) {
      replyPersistence.id = reply.id;
    }
    replyPersistence.commentId = reply.commentId;
    replyPersistence.userId = reply.userId;
    replyPersistence.content = reply.content;
    replyPersistence.createdAt = reply.createdAt;
    replyPersistence.deletedAt = reply.deletedAt;
    replyPersistence.comment = await CommentMapper.toPersistence(reply.comment);
    replyPersistence.user = await UserMapper.toPersistence(reply.user);
    replyPersistence.likes = await Promise.all(
      (reply.likes ?? []).map(like => LikeReplyMapper.toPersistence(like)),
    );

    return replyPersistence;
  }
}

export { ReplyMapper };
