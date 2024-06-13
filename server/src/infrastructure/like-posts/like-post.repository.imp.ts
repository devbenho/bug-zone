import { DataSource, Repository } from 'typeorm';
import { injectable } from 'inversify';
import { LikePost, Post } from '@domain/entities';
import { ILikePostRepository } from '@domain/entities/like-posts/like-post.repository';

@injectable()
export class LikePostRepository
  extends Repository<LikePost>
  implements ILikePostRepository {
  constructor(dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }
  createLikePost(likePost: LikePost): Promise<LikePost> {
    return this.save(likePost);
  }
  findLikePostById(likePostId: string): Promise<LikePost | null> {
    return this.createQueryBuilder('likePost')
      .where('likePost.id = :likePostId', { likePostId })
      .getOne() as Promise<LikePost>;
  }
  findUserLikes(
    limit: number,
    page: number,
    userId: string,
  ): Promise<LikePost[]> {
    return this.createQueryBuilder('likePost')
      .where('likePost.userId = :userId', { userId })
      .take(limit || 10)
      .skip(page * limit)
      .getMany();
  }
  findAll(limit: number, page: number): Promise<LikePost[]> {
    return this.createQueryBuilder('likePost')
      .take(limit || 10)
      .skip(page * limit)
      .getMany();
  }
  findByPost(postId: string): Promise<LikePost[] | null> {
    return this.createQueryBuilder('likePost')
      .where('likePost.postId = :postId', { postId })
      .getMany();
  }
  findByUser(userId: string): Promise<LikePost[] | null> {
    return this.createQueryBuilder('likePost')
      .where('likePost.userId = :userId', { userId })
      .getMany();
  }
}
