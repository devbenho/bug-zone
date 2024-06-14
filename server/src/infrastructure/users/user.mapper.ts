import { UserPersistence } from '@infrastructure/users/user.persistence';
import {
  LikePostMapper,
  LikePostPersistence,
} from '@infrastructure/like-posts/';
import {
  LikeCommentMapper,
  LikeCommentPersistence,
} from '@infrastructure/like-comments/';
import {
  LikeReplyMapper,
  LikeReplyPersistence,
} from '@infrastructure/like-replies/';
import { CommentMapper, CommentPersistence } from '@infrastructure/comments/';
import { PostMapper, PostPersistence } from '@infrastructure/posts/';
import { ReplyMapper, ReplyPersistence } from '@infrastructure/replies/';
import { User } from '@domain/entities';

class UserMapper {
  static toDomain(
    persistence: UserPersistence,
    lazyEntities?: {
      comments?: CommentPersistence[];
      likedComments?: LikeCommentPersistence[];
      posts?: PostPersistence[];
      likedPosts?: LikePostPersistence[];
      replies?: ReplyPersistence[];
      likedReplies?: LikeReplyPersistence[];
    },
  ): User {
    const domainComments = (lazyEntities?.comments ?? []).map(comment =>
      CommentMapper.toDomain(comment as CommentPersistence),
    );

    const domainLikedComments = (lazyEntities?.likedComments ?? []).map(
      likeComment => LikeCommentMapper.toDomain(likeComment),
    );

    const domainPosts = (lazyEntities?.posts ?? []).map(post =>
      PostMapper.toDomain(post),
    );

    const domainLikedPosts = (lazyEntities?.likedPosts ?? []).map(likePost =>
      LikePostMapper.toDomain(likePost),
    );

    const domainReplies = (lazyEntities?.replies ?? []).map(reply =>
      ReplyMapper.toDomain(reply),
    );

    const domainLikedReplies = (lazyEntities?.likedReplies ?? []).map(
      likeReply => LikeReplyMapper.toDomain(likeReply),
    );

    return User.create(
      persistence.id,
      persistence.firstName,
      persistence.lastName,
      persistence.email,
      persistence.username,
      persistence.hashedPassword,
      persistence.role.split(',').map(role => role.trim() as string),
      persistence.createdAt,
      persistence.id ?? '',
      persistence.updatedAt,
      persistence.id ?? '',
      domainComments,
      domainLikedComments,
      domainPosts,
      domainLikedPosts,
      domainReplies,
      domainLikedReplies,
    );
  }

  static toPersistence(domainUser: User): UserPersistence {
    const userPersistence = new UserPersistence();

    if (domainUser.id) {
      userPersistence.id = domainUser.id;
    }
    userPersistence.username = domainUser.username;
    userPersistence.email = domainUser.email;
    userPersistence.firstName = domainUser.firstName;
    userPersistence.lastName = domainUser.lastName;
    userPersistence.hashedPassword = domainUser.password;
    userPersistence.role = domainUser.roles.toString();
    userPersistence.createdAt = domainUser.createdAt;
    userPersistence.updatedAt = domainUser.updatedAt;
    userPersistence.deletedAt = domainUser.deletedAt;

    if (domainUser.posts) {
      userPersistence.posts = Promise.all(
        domainUser.posts.map(PostMapper.toPersistence),
      );
    }

    if (domainUser.likedPosts) {
      userPersistence.likedPosts = Promise.all(
        domainUser.likedPosts.map(LikePostMapper.toPersistence),
      );
    }

    if (domainUser.comments) {
      userPersistence.comments = Promise.all(
        domainUser.comments.map(comment =>
          CommentMapper.toPersistence(comment),
        ),
      );
    }

    if (domainUser.likedComments) {
      userPersistence.likedComments = Promise.all(
        domainUser.likedComments.map(LikeCommentMapper.toPersistence),
      );
    }

    if (domainUser.replies) {
      userPersistence.replies = Promise.all(
        domainUser.replies.map(ReplyMapper.toPersistence),
      );
    }

    if (domainUser.likedReplies) {
      userPersistence.likedReplies = Promise.all(
        domainUser.likedReplies.map(LikeReplyMapper.toPersistence),
      );
    }

    return userPersistence;
  }
}

export { UserMapper };
