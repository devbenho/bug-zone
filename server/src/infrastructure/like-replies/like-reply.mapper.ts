import { UserMapper } from '@infrastructure/users';
import { LikeReply, Reply, User } from '@domain/entities';
import { LikeReplyPersistence } from './like-reply.persistence';
import { ReplyMapper } from '@infrastructure/replies/reply.mapper';

class LikeReplyMapper {
  static async toDomain(
    likeReplyPer: LikeReplyPersistence,
  ): Promise<LikeReply> {
    const userPromise = likeReplyPer.user
      ? UserMapper.toDomain(likeReplyPer.user)
      : null;
    const replyPromise = likeReplyPer.reply
      ? await ReplyMapper.toDomain(await likeReplyPer.reply)
      : null;

    const [user, reply] = await Promise.all([userPromise, replyPromise]);

    return {
      id: likeReplyPer.id,
      createdAt: likeReplyPer.createdAt,
      updatedAt: likeReplyPer.updatedAt,
      deletedAt: likeReplyPer.deletedAt,
      user: user as User,
      reply: reply as Reply,
      replyId: likeReplyPer.replyId,
      userId: likeReplyPer.userId,
      createdBy: likeReplyPer.userId,
      updatedBy: likeReplyPer.userId,
      deletedBy: likeReplyPer.userId,
      equals: (likeReply: LikeReply) => likeReply.id === likeReplyPer.id,
    };
  }

  static async toPersistence(
    likeReply: LikeReply,
  ): Promise<LikeReplyPersistence> {
    return {
      id: likeReply.id!,
      createdAt: likeReply.createdAt,
      updatedAt: likeReply.updatedAt!,
      deletedAt: likeReply.deletedAt,
      user: await UserMapper.toPersistence(likeReply.user),
      reply: ReplyMapper.toPersistence(likeReply.reply),
      replyId: likeReply.replyId,
      userId: likeReply.userId,
    };
  }
}

export { LikeReplyMapper };
