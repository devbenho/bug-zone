import { User } from '@domain/entities/user';
import { UserPersistence } from '@infrastructure/users/user.persistence';
import { LikePostMapper } from '@infrastructure/like-posts/like-post.mapper';
import { LikeCommentMapper } from '@infrastructure/like-comments/like-comment.mapper';
import { LikeReplyMapper } from '@infrastructure/like-replies/like-reply.mapper';
import { CommentMapper } from '@infrastructure/comments/comment.mapper';
import { PostMapper } from '@infrastructure/posts/post.mapper';
import { ReplyMapper } from '@infrastructure/replies/reply.mapper';

class UserMapper {
  static async toDomain(persistence: UserPersistence): Promise<User> {
    const comments = await (persistence.comments ?? Promise.resolve([]));
    const posts = await (persistence.posts ?? Promise.resolve([]));
    const likedPosts = await (persistence.likedPosts ?? Promise.resolve([]));
    const likedReplies = await (persistence.likedReplies ?? Promise.resolve([]));
    const replies = await (persistence.replies ?? Promise.resolve([]));
    const likedComments = await (persistence.likedComments ?? Promise.resolve([]));

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
      await Promise.all(comments.map(comment => CommentMapper.toDomain(comment))),
      await Promise.all(likedComments.map(likeComment => LikeCommentMapper.toDomain(likeComment))),
      await Promise.all(posts.map(post => PostMapper.toDomain(post)),),
      await Promise.all(likedPosts.map(likePost => LikePostMapper.toDomain(likePost))),
      await Promise.all(replies.map(reply => ReplyMapper.toDomain(reply))),
      await Promise.all(likedReplies.map(likeReply => LikeReplyMapper.toDomain(likeReply))),
    );
  }

  static async toPersistence(domain: User): Promise<UserPersistence> {
    const userPersistence = new UserPersistence();

    userPersistence.id = domain.id;
    userPersistence.username = domain.username;
    userPersistence.email = domain.email;
    userPersistence.firstName = domain.firstName;
    userPersistence.lastName = domain.lastName;
    userPersistence.hashedPassword = domain.password;
    userPersistence.role = domain.role;
    userPersistence.createdAt = domain.createdAt;
    userPersistence.updatedAt = domain.updatedAt;
    userPersistence.deletedAt = domain.deletedAt;

    userPersistence.likedPosts = Promise.resolve(
      await Promise.all(
        domain.likedPosts?.map(likePost => LikePostMapper.toPersistence(likePost)) ?? []
      )
    );

    userPersistence.replies = Promise.resolve(
      await Promise.all(
        domain.replies?.map(reply => ReplyMapper.toPersistence(reply)) ?? []
      )
    );

    userPersistence.comments = Promise.resolve(
      await Promise.all(
        domain.comments?.map(comment => CommentMapper.toPersistence(comment)) ?? []
      )
    );

    userPersistence.posts = Promise.resolve(
      await Promise.all(
        domain.posts?.map(post => PostMapper.toPersistence(post)) ?? []
      )
    );

    userPersistence.likedComments = Promise.resolve(
      await Promise.all(
        domain.likedComments?.map(likeComment => LikeCommentMapper.toPersistence(likeComment)) ?? []
      )
    );

    userPersistence.likedReplies = Promise.resolve(
      await Promise.all(
        domain.likedReplies?.map(likeReply => LikeReplyMapper.toPersistence(likeReply)) ?? []
      )
    );

    return userPersistence;
  }
}

export { UserMapper };
