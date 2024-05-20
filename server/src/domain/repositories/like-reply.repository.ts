import { LikeReply } from '@domain/entities';

interface ILikeReplyRepository {
  createLikeReply(likeReply: LikeReply): Promise<LikeReply>;
  findLikeReplyById(likeReplyId: string): Promise<LikeReply | null>;
  findUserLikeReplies(userId: string): Promise<LikeReply[]>;
}

export { ILikeReplyRepository };
