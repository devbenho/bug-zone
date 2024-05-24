import { LikePost } from '@domain/entities/like-post';
import { UserMapper } from '@infrastructure/users';
import { PostMapper } from '@infrastructure/posts/post.mapper';
import { LikePostPersistence } from './like-post.persistence';

class LikePostMapper {
  static toDomain(likePostPer: LikePostPersistence): LikePost {
    return new LikePost(
      likePostPer.id,
      likePostPer.postId,
      PostMapper.toDomain(likePostPer.post),
      likePostPer.userId,
      UserMapper.toDomain(likePostPer.user),
      likePostPer.createdAt,
      likePostPer.userId,
      likePostPer.updatedAt,
      likePostPer.userId,
      likePostPer.deletedAt,
      likePostPer.userId,
    );
  }

  static toPersistence(likePost: LikePost): LikePostPersistence {
    return {
      id: likePost.id!,
      createdAt: likePost.createdAt,
      updatedAt: likePost.updatedAt!,
      deletedAt: likePost.deletedAt!,
      user: UserMapper.toPersistence(likePost.user),
      post: PostMapper.toPersistence(likePost.post),
      postId: likePost.postId,
      userId: likePost.userId,
    }
  }
}

export { LikePostMapper };
