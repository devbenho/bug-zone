import { Comment, LikePost, Post } from '@domain/entities';
import { POST_STATUS } from '@domain/eums/post-status.enum';
import { CommentMapper } from '@infrastructure/comments/comment.mapper';
import { LikePostMapper } from '@infrastructure/like-posts/like-post.mapper';
import { PostPersistence } from '@infrastructure/posts/post.persistence';
import { UserMapper } from '@infrastructure/users';

class PostMapper {
  public static toDomain(postPersistence: PostPersistence): Post {
    const { id, title, content, authorId, author, comments, likes, createdAt, deletedAt, updatedAt, status } = postPersistence;

    return new Post(
      id,
      title, content, authorId, UserMapper.toDomain(author),
      likes.map(like => LikePostMapper.toDomain(like)),
      comments.map(comment => CommentMapper.toDomain(comment)),
      status as POST_STATUS,
      createdAt, updatedAt, deletedAt
    );
  }

  public static toPersistence(post: Post): PostPersistence {
    return new PostPersistence();
  }
}

export { PostMapper };
