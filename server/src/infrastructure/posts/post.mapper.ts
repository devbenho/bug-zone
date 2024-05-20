import { Post } from '@domain/entities';
import { CommentMapper } from '@infrastructure/comments/comment.mapper';
import { LikePostMapper } from '@infrastructure/like-posts/like-post.mapper';
import { PostPersistence } from '@infrastructure/posts/post.persistence';
import { UserMapper } from '@infrastructure/users';
class PostMapper {
  public static toDomain(postPersistence: PostPersistence): Post {
    return new Post(
      postPersistence.id!,
      postPersistence.content,
      postPersistence.authorId,
      UserMapper.toDomain(postPersistence.author),
      postPersistence.comments.map(comment => CommentMapper.toDomain(comment)),
      postPersistence.likes.map(like => LikePostMapper.toDomain(like)),
    );
  }

  public static toPersistence(post: Post): PostPersistence {
    return new PostPersistence(post.title, post.content, post.authorId);
  }
}

export { PostMapper };
