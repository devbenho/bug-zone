import { UserMapper } from '@infrastructure/users';
import { LikeReply } from '@domain/entities';
import { LikeReplyPersistence } from './like-reply.persistence';
import { ReplyMapper } from '@infrastructure/replies/reply.mapper';

class LikeReplyMapper {
  static toDomain(likeReplyPer: LikeReplyPersistence): LikeReply {
    return {
      id: likeReplyPer.id,
      createdAt: likeReplyPer.createdAt,
      updatedAt: likeReplyPer.updatedAt,
      deletedAt: likeReplyPer.deletedAt,
      user: UserMapper.toDomain(likeReplyPer.user),
      reply: ReplyMapper.toDomain(likeReplyPer.reply),
      replyId: likeReplyPer.replyId,
      userId: likeReplyPer.userId,
      createdBy: likeReplyPer.userId,
      updatedBy: likeReplyPer.userId,
      deletedBy: likeReplyPer.userId,
      equals: (likeReply: LikeReply) => likeReply.id === likeReplyPer.id,
      // Add the other two missing properties here
    }
  }

  static toPersistence(likeReply: LikeReply): LikeReplyPersistence {
    return {
      id: likeReply.id!,
      createdAt: likeReply.createdAt,
      updatedAt: likeReply.updatedAt!,
      deletedAt: likeReply.deletedAt,
      user: UserMapper.toPersistence(likeReply.user),
      reply: ReplyMapper.toPersistence(likeReply.reply),
      replyId: likeReply.replyId,
      userId: likeReply.userId,
    }
  }
}

export { LikeReplyMapper };
