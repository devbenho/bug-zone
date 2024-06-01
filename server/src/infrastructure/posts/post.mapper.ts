import { PostPersistence } from '@infrastructure/posts';
import { POST_STATUS } from '@domain/eums/post-status.enum';
import { Post, User } from '@domain/entities';
import { UserMapper, UserPersistence } from '@infrastructure/users';
import { CommentMapper, CommentPersistence } from '@infrastructure/comments';
import {
  LikePostMapper,
  LikePostPersistence,
} from '@infrastructure/like-posts';
import { MapperConfig } from '@infrastructure/shared/persistence/mapper.config';

class PostMapper {
  public static toDomain(
    persistence: PostPersistence,
    lazyEntities?: {
      author?: UserPersistence;
      likes?: LikePostPersistence[];
      comments?: CommentPersistence[];
    },
  ): Post {
    const author = lazyEntities?.author;
    const likes = lazyEntities?.likes ?? [];
    const comments = lazyEntities?.comments ?? [];

    return Post.create(
      persistence.id,
      persistence.title,
      persistence.content,
      persistence.authorId,
      author as any,
      likes.map(like => LikePostMapper.toDomain(like)),
      comments.map(comment => CommentMapper.toDomain(comment)),
      POST_STATUS[persistence.status.toUpperCase() as keyof typeof POST_STATUS],
      persistence.createdAt,
      persistence.updatedAt,
      persistence.deletedAt,
    );
  }

  public static async toPersistence(
    domain: Post,
    config: MapperConfig = {},
  ): Promise<PostPersistence> {
    const postPersistence = new PostPersistence();
    if (domain.id) {
      postPersistence.id = domain.id;
    }

    postPersistence.title = domain.title;
    postPersistence.content = domain.content;
    postPersistence.authorId = domain.authorId;

    if (config.includeAuthor) {
      postPersistence.author = UserMapper.toPersistence(domain.author as User);
    }

    if (config.includeLikes) {
      postPersistence.likes = Promise.resolve(
        await Promise.all(
          domain.likes.map(like => LikePostMapper.toPersistence(like)),
        ),
      );
    }

    if (config.includeComments) {
      postPersistence.comments = Promise.resolve(
        await Promise.all(
          domain.comments.map(comment => CommentMapper.toPersistence(comment)),
        ),
      );
    }

    postPersistence.status = domain.status.toLowerCase();
    postPersistence.createdAt = domain.createdAt;
    postPersistence.deletedAt = domain.deletedAt;

    return postPersistence;
  }
}

export { PostMapper };
