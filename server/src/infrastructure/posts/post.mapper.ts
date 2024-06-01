import { PostPersistence } from '@infrastructure/posts';
import { POST_STATUS } from '@domain/eums/post-status.enum';
import { Post } from '@domain/entities';
import { UserMapper, UserPersistence } from '@infrastructure/users';
import { CommentMapper, CommentPersistence } from '@infrastructure/comments';
import {
  LikePostMapper,
  LikePostPersistence,
} from '@infrastructure/like-posts';

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
      POST_STATUS[persistence.status.toUpperCase() as keyof typeof POST_STATUS];

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
    const postPersistence = new PostPersistence();

    if (domainPost.id) {
      postPersistence.id = domainPost.id;
    }

    postPersistence.title = domainPost.title;
    postPersistence.content = domainPost.content;
    postPersistence.authorId = domainPost.authorId;

    postPersistence.status = domainPost.status.toLowerCase(); //TODO: Refactor this
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

    return postPersistence;
  }
}

export { PostMapper };
