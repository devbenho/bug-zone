import { PostPersistence } from '@infrastructure/posts';
import { Post } from '@domain/entities';
import { UserMapper, UserPersistence } from '@infrastructure/users';
import { CommentMapper, CommentPersistence } from '@infrastructure/comments';
import {
  LikePostMapper,
  LikePostPersistence,
} from '@infrastructure/like-posts';
import { Logger } from '@domain/shared';

class PostMapper {
  public static toDomain(
    persistence: PostPersistence,
    lazyEntities?: {
      author?: UserPersistence;
      likes?: LikePostPersistence[];
      comments?: CommentPersistence[];
    },
  ): Post {
    const domainAuthor = lazyEntities?.author
      ? UserMapper.toDomain(lazyEntities.author)
      : null;

    const domainLikes = (lazyEntities?.likes ?? []).map(like =>
      LikePostMapper.toDomain(like),
    );
    const domainComments = (lazyEntities?.comments ?? []).map(comment =>
      CommentMapper.toDomain(comment),
    );
    const postStatus =
      persistence.status === 'draft'
        ? 'draft'
        : persistence.status === 'published'
          ? 'published'
          : 'archived';

    return Post.create(
      persistence.id,
      persistence.title,
      persistence.content,
      persistence.authorId,
      domainAuthor,
      domainLikes,
      domainComments,
      postStatus,
      persistence.createdAt,
      persistence.updatedAt,
      persistence.deletedAt,
    );
  }

  public static toPersistence(domainPost: Post): PostPersistence {
    Logger.info('PostMapper.toPersistence', domainPost);
    const postPersistence = new PostPersistence();

    if (domainPost.id) {
      postPersistence.id = domainPost.id;
    }

    postPersistence.title = domainPost.title;
    postPersistence.content = domainPost.content;
    postPersistence.authorId = domainPost.authorId;

    postPersistence.status = domainPost.status.toString(); //TODO: Refactor this
    postPersistence.createdAt = domainPost.createdAt;
    postPersistence.deletedAt = domainPost.deletedAt;

    if (domainPost.author)
      postPersistence.author = Promise.resolve(
        UserMapper.toPersistence(domainPost.author),
      );

    if (domainPost.likes)
      postPersistence.likes = Promise.all(
        domainPost.likes.map(LikePostMapper.toPersistence),
      );

    if (domainPost.comments)
      postPersistence.comments = Promise.all(
        domainPost.comments.map(CommentMapper.toPersistence),
      );
    Logger.info('PostMapper.toPersistence done', postPersistence);
    return postPersistence;
  }
}

export { PostMapper };
