import { LikePost } from '@domain/entities';

interface ILikePostRepository {
  createLikePost(likePost: LikePost): Promise<LikePost>;
  findLikePostById(likePostId: string): Promise<LikePost | null>;
  findUserLikes(
    limit: number,
    page: number,
    userId: string,
  ): Promise<LikePost[]>;
  findAll(limit: number, page: number): Promise<LikePost[]>;
  findByPost(postId: string): Promise<LikePost[] | null>;
  findByUser(userId: string): Promise<LikePost[] | null>;
}

export { ILikePostRepository };
