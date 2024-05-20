import { DataSource, Repository } from 'typeorm';
import { injectable } from 'inversify';
import { LikeComment } from '@domain/entities/like-comment';
import { ILikeCommentRepository } from '@domain/repositories/like-comment.repository';

@injectable()
export class LikeCommentRepository
  extends Repository<LikeComment>
  implements ILikeCommentRepository
{
  constructor(dataSource: DataSource) {
    super(LikeComment, dataSource.createEntityManager());
  }
  createLikeComment(likeComment: LikeComment): Promise<LikeComment> {
    return this.save(likeComment);
  }
  deleteLikeComment(likeComment: LikeComment): Promise<LikeComment> {
    this.createQueryBuilder('likeComment')
      .delete()
      .where('likeComment.id = :id', { id: likeComment.id })
      .execute();
    return Promise.resolve(likeComment);
  }
  findLikeCommentById(likeCommentId: string): Promise<LikeComment> {
    return this.createQueryBuilder('likeComment')
      .where('likeComment.id = :likeCommentId', { likeCommentId })
      .getOne() as Promise<LikeComment>;
  }
  findUserLikeComments(userId: string): Promise<LikeComment[]> {
    return this.createQueryBuilder('likeComment')
      .where('likeComment.userId = :userId', { userId })
      .getMany();
  }
  findAll(limit: number, page: number): Promise<LikeComment[]> {
    return this.createQueryBuilder('likeComment')
      .take(limit || 10)
      .skip(page * limit)
      .getMany();
  }
}
