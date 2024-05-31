import { LikePost } from '@domain/entities/like-post';
import { UserMapper } from '@infrastructure/users';
import { PostMapper } from '@infrastructure/posts/post.mapper';
import { LikePostPersistence } from './like-post.persistence';

class LikePostMapper {
  static async toDomain(likePostPer: LikePostPersistence): Promise<LikePost> {
    const post = await PostMapper.toDomain(likePostPer.post);
    const user = await UserMapper.toDomain(likePostPer.user);
    return new LikePost(
      likePostPer.id,
      likePostPer.postId,
      post,
      likePostPer.userId,
      user,
      likePostPer.createdAt,
      likePostPer.userId,
      likePostPer.updatedAt,
      likePostPer.userId,
      likePostPer.deletedAt,
      likePostPer.userId,
    );
  }

  static toPersistence(likePost: LikePost): Promise<LikePostPersistence> {
    const likePostPersistence = new LikePostPersistence();

    return Promise.resolve(likePostPersistence);
  }
}

export { LikePostMapper };
