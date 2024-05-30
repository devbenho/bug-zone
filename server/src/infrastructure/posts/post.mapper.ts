import { PostPersistence } from '@infrastructure/posts';
import { POST_STATUS } from '@domain/eums/post-status.enum';
import { Post } from '@domain/entities';
import { UserMapper } from '@infrastructure/users';
import { CommentMapper } from '@infrastructure/comments';
import { LikePostMapper } from '@infrastructure/like-posts';
import { log } from 'console';

class PostMapper {
  public static async toDomain(persistence: PostPersistence): Promise<Post> {
    log(`Post Persistence after loading : `, await persistence.likes);
    const likes = await persistence.likes;
    const comments = await persistence.comments;

    return Post.create(
      persistence.id,
      persistence.title,
      persistence.content,
      persistence.authorId,
      await UserMapper.toDomain(persistence.author),
      await Promise.all(likes.map(like => LikePostMapper.toDomain(like))),
      await Promise.all(
        comments.map(comment => CommentMapper.toDomain(comment)),
      ),
      POST_STATUS[persistence.status.toUpperCase() as keyof typeof POST_STATUS],
      persistence.createdAt,
      persistence.updatedAt,
      persistence.deletedAt,
    );
  }

  public static async toPersistence(domain: Post): Promise<PostPersistence> {
    const postPersistence = new PostPersistence();
    if (domain.id) {
      postPersistence.id = domain.id;
    }

    postPersistence.title = domain.title;
    postPersistence.content = domain.content;
    postPersistence.authorId = domain.authorId;
    postPersistence.author = await UserMapper.toPersistence(domain.author);
    postPersistence.likes = Promise.resolve(
      await Promise.all(
        domain.likes.map(like => LikePostMapper.toPersistence(like)),
      ),
    );

    postPersistence.comments = Promise.resolve(
      await Promise.all(
        domain.comments.map(comment => CommentMapper.toPersistence(comment)),
      ),
    );

    postPersistence.status = domain.status.toLowerCase();
    postPersistence.createdAt = domain.createdAt;
    postPersistence.deletedAt = domain.deletedAt;

    return postPersistence;
  }
}

export { PostMapper };
