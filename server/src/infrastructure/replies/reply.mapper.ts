import { Reply } from '@domain/entities';
import { ReplyPersistence } from './reply.persistence';
import { CommentMapper } from '@infrastructure/comments/comment.mapper';
import { LikeReplyMapper } from '@infrastructure/like-replies/like-reply.mapper';

class ReplyMapper {
  static toDomain(reply: ReplyPersistence): Reply {
    return new Reply(
      reply.commentId,
      reply.userId,
      reply.content,
      CommentMapper.toDomain(reply.comment),
      reply.likes.map(like => LikeReplyMapper.toDomain(like)),
    );
  }

  static toPersistence(reply: Reply): ReplyPersistence {
    return new ReplyPersistence(
      reply.content,
      reply.userId,
      reply.commentId,
      CommentMapper.toPersistence(reply.comment),
    );
  }
}

export { ReplyMapper };
