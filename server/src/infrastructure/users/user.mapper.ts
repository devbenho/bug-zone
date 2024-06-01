import { User } from '@domain/entities/user';
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
import { Comment, LikePost, LikeReply, Post, Reply } from '@domain/entities';
import { LikeComment } from '@domain/entities/like-comment';

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
    const comments = lazyEntities?.comments ?? [];
    const likedComments = lazyEntities?.likedComments ?? [];
    const posts = lazyEntities?.posts ?? [];
    const likedPosts = lazyEntities?.likedPosts ?? [];
    const replies = lazyEntities?.replies ?? [];
    const likedReplies = lazyEntities?.likedReplies ?? [];

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

      comments.map(comment => CommentMapper.toDomain(comment)),
      likedComments.map(likeComment => LikeCommentMapper.toDomain(likeComment)),
      posts.map(post => PostMapper.toDomain(post)),
      likedPosts.map(likePost => LikePostMapper.toDomain(likePost)),
      replies.map(reply => ReplyMapper.toDomain(reply)),
      likedReplies.map(likeReply => LikeReplyMapper.toDomain(likeReply)),
    );
  }

  static async toPersistence(
    domain: User,
    domainEntities?: {
      comments?: Comment[];
      likedComments?: LikeComment[];
      posts?: Post[];
      likedPosts?: LikePost[];
      replies?: Reply[];
      likedReplies?: LikeReply[];
    },
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

    if (domainEntities) {
      if (domainEntities.comments) {
        userPersistence.comments = Promise.resolve(
          await Promise.all(
            domainEntities.comments.map(comment =>
              CommentMapper.toPersistence(comment),
            ),
          ),
        );
      }

      if (domainEntities.likedComments) {
        userPersistence.likedComments = Promise.resolve(
          await Promise.all(
            domainEntities.likedComments.map(likeComment =>
              LikeCommentMapper.toPersistence(likeComment),
            ),
          ),
        );
      }

      if (domainEntities.posts) {
        userPersistence.posts = Promise.resolve(
          await Promise.all(
            domainEntities.posts.map(post => PostMapper.toPersistence(post)),
          ),
        );
      }

      if (domainEntities.likedPosts) {
        userPersistence.likedPosts = Promise.resolve(
          await Promise.all(
            domainEntities.likedPosts.map(likePost =>
              LikePostMapper.toPersistence(likePost),
            ),
          ),
        );
      }

      if (domainEntities.replies) {
        userPersistence.replies = Promise.resolve(
          await Promise.all(
            domainEntities.replies.map(reply =>
              ReplyMapper.toPersistence(reply),
            ),
          ),
        );
      }

      if (domainEntities.likedReplies) {
        userPersistence.likedReplies = Promise.resolve(
          await Promise.all(
            domainEntities.likedReplies.map(likeReply =>
              LikeReplyMapper.toPersistence(likeReply),
            ),
          ),
        );
      }
    }

    return userPersistence;
  }
}

export { UserMapper };
