import { UserMapper, UserPersistence } from '@infrastructure/users';
import { LikeReply, Reply, User } from '@domain/entities';
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
    const user = lazyEntities?.user
      ? UserMapper.toDomain(lazyEntities.user)
      : likeReplyPer.user
        ? UserMapper.toDomain(likeReplyPer.user)
        : null;

    const reply = lazyEntities?.reply
      ? ReplyMapper.toDomain(lazyEntities.reply)
      : null;

    return new LikeReply(
      likeReplyPer.id,
      likeReplyPer.replyId,
      reply,
      likeReplyPer.userId,
      user,
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

    return Promise.resolve(likeReplyPersistence);
  }
}

export { LikeReplyMapper };
