import { UserMapper } from '@infrastructure/users';
import { LikeReply } from '@domain/entities';
import { LikeReplyPersistence } from './like-reply.persistence';
import { ReplyMapper } from '@infrastructure/replies/reply.mapper';

class LikeReplyMapper {
  static toDomain(likeReplyPer: LikeReplyPersistence): LikeReply {
    return new LikeReply(
      likeReplyPer.replyId,
      ReplyMapper.toDomain(likeReplyPer.reply),
      likeReplyPer.userId,
      UserMapper.toDomain(likeReplyPer.user),
    );
  }

  static toPersistence(likeReply: LikeReply): LikeReplyPersistence {
    return new LikeReplyPersistence(
      likeReply.userId,
      UserMapper.toPersistence(likeReply.user),
      likeReply.replyId,
      ReplyMapper.toPersistence(likeReply.reply),
    );
  }
}

export { LikeReplyMapper };
