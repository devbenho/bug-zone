import LikePostPersistence
  from '@/infrastcuture/LikePosts/like-post.persistence';
import { LikePost } from '@domain/entities/like-post';
import { UserMapper } from '@/infrastcuture/users';
import { PostMapper } from '@/infrastcuture/posts/post.mapper';

class LikePostMapper {
  static toDomain(likePostPer: LikePostPersistence): LikePost {
    return new LikePost(
      likePostPer.id,
      likePostPer.postId,
      likePostPer.userId,
      likePostPer.createdAt,
      likePostPer.updatedAt,
      likePostPer.deletedAt,
    );
  }

  static toPersistence(likePost: LikePost): LikePostPersistence {
    return new LikePostPersistence(
      likePost.id,
      likePost.userId,
      UserMapper.toPersistence(likePost.user),
      likePost.postId,
      PostMapper.toPersistence(likePost.post),
      likePost.createdAt,
      likePost.updatedAt,
      likePost.deletedAt,
    );
  }
}

export { LikePostMapper }