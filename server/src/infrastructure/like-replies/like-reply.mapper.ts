import { UserMapper, UserPersistence } from '@infrastructure/users';
import { LikeReply } from '@domain/entities';
import { LikeReplyPersistence } from './like-reply.persistence';
import { ReplyMapper, ReplyPersistence } from '@infrastructure/replies';

class LikeReplyMapper {
  static toDomain(
    likeReplyPer: LikeReplyPersistence,
    lazyEntities?: {
      user?: UserPersistence;
      reply?: ReplyPersistence;
    },
  ): LikeReply {
    const domainUser = lazyEntities?.user
      ? UserMapper.toDomain(lazyEntities.user)
      : null;

    const domainReply = lazyEntities?.reply
      ? ReplyMapper.toDomain(lazyEntities.reply)
      : null;

    return new LikeReply(
      likeReplyPer.id,
      likeReplyPer.replyId,
      domainReply,
      likeReplyPer.userId,
      domainUser,
      likeReplyPer.createdAt,
      likeReplyPer.userId,
      likeReplyPer.updatedAt,
      likeReplyPer.userId,
      likeReplyPer.deletedAt,
      likeReplyPer.userId,
    );
  }

  static toPersistence(likeReply: LikeReply): Promise<LikeReplyPersistence> {
    const likeReplyPersistence = new LikeReplyPersistence();

    if (likeReply.id) {
      likeReplyPersistence.id = likeReply.id;
    }

    likeReplyPersistence.replyId = likeReply.replyId;
    likeReplyPersistence.userId = likeReply.userId;
    likeReplyPersistence.createdAt = likeReply.createdAt;
    likeReplyPersistence.deletedAt = likeReply.deletedAt;

    if (likeReply.user) {
      likeReplyPersistence.user = Promise.resolve(
        UserMapper.toPersistence(likeReply.user),
      );
    }

    if (likeReply.reply) {
      likeReplyPersistence.reply = Promise.resolve(
        ReplyMapper.toPersistence(likeReply.reply),
      );
    }
    return Promise.resolve(likeReplyPersistence);
  }
}

export { LikeReplyMapper };
