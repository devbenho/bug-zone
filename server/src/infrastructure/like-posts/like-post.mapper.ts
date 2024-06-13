import { LikePost } from '@domain/entities/';
import { UserMapper, UserPersistence } from '@infrastructure/users';
import { PostMapper, PostPersistence } from '@infrastructure/posts/';
import { LikePostPersistence } from './like-post.persistence';

class LikePostMapper {
  static toDomain(
    likePostPer: LikePostPersistence,
    lazyEntitis?: {
      post?: PostPersistence;
      user?: UserPersistence;
    },
  ): LikePost {
    const domainPost = lazyEntitis?.post
      ? PostMapper.toDomain(lazyEntitis.post)
      : null;
    const domainUser = lazyEntitis?.user
      ? UserMapper.toDomain(lazyEntitis.user)
      : null;
    return new LikePost(
      likePostPer.id,
      likePostPer.postId,
      domainPost,
      likePostPer.userId,
      domainUser,
      likePostPer.createdAt,
      likePostPer.userId,
      likePostPer.updatedAt,
      likePostPer.userId,
      likePostPer.deletedAt,
      likePostPer.userId,
    );
  }

  static toPersistence(likePostDomain: LikePost): LikePostPersistence {
    const likePostPersistence = new LikePostPersistence();

    if (likePostDomain.id) {
      likePostPersistence.id = likePostDomain.id;
    }

    likePostPersistence.postId = likePostDomain.postId;
    likePostPersistence.userId = likePostDomain.userId;
    likePostPersistence.createdAt = likePostDomain.createdAt;
    likePostPersistence.deletedAt = likePostDomain.createdAt;

    if (likePostDomain.user) {
      likePostPersistence.user = Promise.resolve(
        UserMapper.toPersistence(likePostDomain.user),
      );
    }

    if (likePostDomain.post) {
      likePostPersistence.post = Promise.resolve(
        PostMapper.toPersistence(likePostDomain.post),
      );
    }

    return likePostPersistence;
  }
}

export { LikePostMapper };
