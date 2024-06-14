import { Reply } from '@domain/entities';
import { IReplyRepository } from '@domain/entities/replies/reply.repository';
import { Nullable } from '@domain/shared/types';
import { injectable } from 'inversify';
import { DataSource, Repository } from 'typeorm';

@injectable()
export class ReplyRepository
  extends Repository<Reply>
  implements IReplyRepository
{
  constructor(dataSource: DataSource) {
    super(Reply, dataSource.createEntityManager());
  }
  updateReply(replyId: string, reply: Reply): Promise<Reply> {
    throw new Error('Method not implemented.');
  }
  saveReply(reply: Reply): Promise<Reply> {
    return this.save(reply);
  }
  findReplyById(replyId: string): Promise<Nullable<Reply>> {
    return this.createQueryBuilder('reply')
      .where('reply.id = :replyId)', { replyId })
      .getOne();
  }
  findUserReplies(userId: string): Promise<Reply[]> {
    return this.createQueryBuilder('reply')
      .where('reply.authorId = :userId', { userId })
      .getMany();
  }
  findAll(limit: number, page: number): Promise<Reply[]> {
    return this.createQueryBuilder('reply')
      .take(limit || 10)
      .skip(page * limit)
      .getMany();
  }
  findByContent(content: string): Promise<Nullable<Reply>> {
    return this.createQueryBuilder('reply')
      .where('reply.content = :content', { content })
      .getOne();
  }
  findByAuthor(authorId: string): Promise<Nullable<Reply>> {
    return this.createQueryBuilder('reply')
      .where('reply.authorId = :authorId', { authorId })
      .getOne();
  }
  findByComment(commentId: string): Promise<Reply[]> {
    return this.createQueryBuilder('reply')
      .where('reply.commentId = :commentId', { commentId })
      .getMany();
  }
}
