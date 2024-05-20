import { LikeComment } from '@domain/entities/like-comment';

interface ILikeCommentRepository {
  createLikeComment(likeComment: LikeComment): Promise<LikeComment>;
  deleteLikeComment(likeComment: LikeComment): Promise<LikeComment>;
  findLikeCommentById(likeCommentId: string): Promise<LikeComment>;
  findUserLikeComments(userId: string): Promise<LikeComment[]>;
  findAll(limit: number, page: number): Promise<LikeComment[]>;
}

export { ILikeCommentRepository };
