import { Post } from '@domain/entities';
import { PostPersistence } from '@infrastructure/posts/post.persistence';
import { UserMapper } from '@infrastructure/users';
import { CommentMapper } from '@infrastructure/comments/comment.mapper';
import { LikePostMapper } from '@infrastcuture/LikePosts/like-post.mapper';

class PostMapper {
  static toDomain(postPer: PostPersistence): Post {
    return new Post(
      postPer.id,
      postPer.title,
      postPer.content,
      postPer.authorId,
      UserMapper.toDomain(postPer.author),
      postPer.comments.map(CommentMapper.toDomain),
      postPer.likes,
      postPer.createdAt,
      postPer.updatedAt,
      postPer.deletedAt,
    );
  }

  static toPersistence(post: Post): PostPersistence {
    return new PostPersistence(
      post.id,
      post.title,
      post.content,
      post.authorId,
      UserMapper.toPersistence(post.author),
      post.comments.map(CommentMapper.toPersistence),
      post.likes.map(LikePostMapper.toPersistence),
      post.createdAt,
      post.updatedAt,
      post.deletedAt,
    );
  }
}

export { PostMapper };
