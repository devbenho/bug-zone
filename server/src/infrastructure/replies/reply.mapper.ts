import { Reply } from '@domain/entities';
import { ReplyPersistence } from './reply.persistence';
import { CommentMapper } from '@infrastructure/comments/comment.mapper';
import { LikeReplyMapper } from '@infrastructure/like-replies/like-reply.mapper';
import { UserMapper } from '..';

class ReplyMapper {
  static toDomain(reply: ReplyPersistence): Reply {
    return new Reply(
      reply.id,
      reply.commentId,
      CommentMapper.toDomain(reply.comment),
      reply.userId,
      UserMapper.toDomain(reply.user),
      reply.content,
      reply.likes.map(like => LikeReplyMapper.toDomain(like)),
      reply.createdAt,
      reply.userId,
      reply.updatedAt,
      reply.userId,
      reply.deletedAt,
      reply.userId,
    );
  }

  static toPersistence(reply: Reply): ReplyPersistence {
    return new ReplyPersistence();
  }
}

export { ReplyMapper };
