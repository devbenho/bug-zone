import { User } from '@domain/entities/user';
import { UserPersistence } from '@infrastructure/users/user.persistence';
import { LikePostMapper } from '@infrastructure/like-posts/like-post.mapper';
import { LikeCommentMapper } from '@infrastructure/like-comments/like-comment.mapper';
import { LikeReplyMapper } from '@infrastructure/like-replies/like-reply.mapper';
import { CommentMapper } from '@infrastructure/comments/comment.mapper';
import { PostMapper } from '@infrastructure/posts/post.mapper';
import { ReplyMapper } from '@infrastructure/replies/reply.mapper';
import { MapperConfig } from '@infrastructure/shared/persistence/mapper.config';

class UserMapper {
  static async toDomain(
    persistence: UserPersistence,
    config: MapperConfig = {},
  ): Promise<User> {
    const comments = config.includeComments
      ? await (persistence.comments ?? Promise.resolve([]))
      : [];
    const posts = config.includePosts
      ? await (persistence.posts ?? Promise.resolve([]))
      : [];
    const likedPosts = config.includeLikedPosts
      ? await (persistence.likedPosts ?? Promise.resolve([]))
      : [];
    const likedReplies = config.includeLikedReplies
      ? await (persistence.likedReplies ?? Promise.resolve([]))
      : [];
    const replies = config.includeReplies
      ? await (persistence.replies ?? Promise.resolve([]))
      : [];
    const likedComments = config.includeLikedComments
      ? await (persistence.likedComments ?? Promise.resolve([]))
      : [];

    return User.create(
      persistence.id,
      persistence.firstName,
      persistence.lastName,
      persistence.email,
      persistence.username,
      persistence.hashedPassword,
      persistence.role,
      persistence.createdAt,
      persistence.id ?? '',
      persistence.updatedAt,
      persistence.id ?? '',
      await Promise.all(
        comments.map(comment => CommentMapper.toDomain(comment)),
      ),
      await Promise.all(
        likedComments.map(likeComment =>
          LikeCommentMapper.toDomain(likeComment),
        ),
      ),
      await Promise.all(posts.map(post => PostMapper.toDomain(post))),
      await Promise.all(
        likedPosts.map(likePost => LikePostMapper.toDomain(likePost)),
      ),
      await Promise.all(replies.map(reply => ReplyMapper.toDomain(reply))),
      await Promise.all(
        likedReplies.map(likeReply => LikeReplyMapper.toDomain(likeReply)),
      ),
    );
  }

  static async toPersistence(
    domain: User,
    config: MapperConfig = {},
  ): Promise<UserPersistence> {
    const userPersistence = new UserPersistence();

    if (domain.id) {
      userPersistence.id = domain.id;
    }
    userPersistence.username = domain.username;
    userPersistence.email = domain.email;
    userPersistence.firstName = domain.firstName;
    userPersistence.lastName = domain.lastName;
    userPersistence.hashedPassword = domain.password;
    userPersistence.role = domain.role;
    userPersistence.createdAt = domain.createdAt;
    userPersistence.updatedAt = domain.updatedAt;
    userPersistence.deletedAt = domain.deletedAt;

    if (config.includeLikedPosts) {
      userPersistence.likedPosts = Promise.resolve(
        await Promise.all(
          domain.likedPosts?.map(likePost =>
            LikePostMapper.toPersistence(likePost),
          ) ?? [],
        ),
      );
    }

    if (config.includeReplies) {
      userPersistence.replies = Promise.resolve(
        await Promise.all(
          domain.replies?.map(reply => ReplyMapper.toPersistence(reply)) ?? [],
        ),
      );
    }

    if (config.includeComments) {
      userPersistence.comments = Promise.resolve(
        await Promise.all(
          domain.comments?.map(comment =>
            CommentMapper.toPersistence(comment),
          ) ?? [],
        ),
      );
    }

    if (config.includePosts) {
      userPersistence.posts = Promise.resolve(
        await Promise.all(
          domain.posts?.map(post => PostMapper.toPersistence(post)) ?? [],
        ),
      );
    }

    if (config.includeLikedComments) {
      userPersistence.likedComments = Promise.resolve(
        await Promise.all(
          domain.likedComments?.map(likeComment =>
            LikeCommentMapper.toPersistence(likeComment),
          ) ?? [],
        ),
      );
    }

    if (config.includeLikedReplies) {
      userPersistence.likedReplies = Promise.resolve(
        await Promise.all(
          domain.likedReplies?.map(likeReply =>
            LikeReplyMapper.toPersistence(likeReply),
          ) ?? [],
        ),
      );
    }

    return userPersistence;
  }
}

export { UserMapper };
