import { DataSource, Repository } from 'typeorm';
import { injectable } from 'inversify';
import { LikeReply } from '@domain/entities';
import { ILikeReplyRepository } from '@domain/entities/like-replies';

@injectable()
export class LikeReplyRepository
  extends Repository<LikeReply>
  implements ILikeReplyRepository {
  constructor(dataSource: DataSource) {
    super(LikeReply, dataSource.createEntityManager());
  }
  async createLikeReply(likeReply: LikeReply): Promise<LikeReply> {
    throw new Error('Method not implemented.');
  }
  findLikeReplyById(likeReplyId: string): Promise<LikeReply | null> {
    return this.createQueryBuilder('likeReply')
      .where('likeReply.id = :likeReplyId', { likeReplyId })
      .getOne();
  }
  findUserLikeReplies(userId: string): Promise<LikeReply[]> {
    return this.createQueryBuilder('likeReply')
      .where('likeReply.userId = :userId', { userId })
      .getMany();
  }
}
