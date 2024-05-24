import { User } from '@domain/entities/user';
import { UserPersistence } from './user.persistence';
import { injectable } from 'inversify';
import {
  CommentMapper,
  CommentPersistence,
  LikeCommentMapper,
  LikeReplyMapper,
  PostMapper,
  ReplyMapper,
} from '..';
import { LikePostMapper } from '@infrastructure/like-posts/like-post.mapper';
@injectable()
class UserMapper {
  public static toDomain(userPersistenceModel: UserPersistence): User {
    const { id } = userPersistenceModel;
    return {
      id: userPersistenceModel.id,
      firstName: userPersistenceModel.firstName,
      lastName: userPersistenceModel.lastName,
      email: userPersistenceModel.email,
      username: userPersistenceModel.username,
      password: userPersistenceModel.password,
      createdAt: userPersistenceModel.createdAt,
      updatedAt: userPersistenceModel.updatedAt,
      deletedAt: userPersistenceModel.deletedAt,
      comments: userPersistenceModel.comments.map(comment =>
        CommentMapper.toDomain(comment),
      ),
      likedPosts: userPersistenceModel.likedPosts.map(like => {
        return LikePostMapper.toDomain(like);
      }),
      likedComments: userPersistenceModel.likedComments.map(like =>
        LikeCommentMapper.toDomain(like),
      ),
      equals: (user: User) => user.id === id,
      role: userPersistenceModel.role,
      createdBy: userPersistenceModel.id as string,
      updatedBy: userPersistenceModel.id,
      deletedBy: userPersistenceModel.id,
      isPasswordMatched: (password: string) =>
        userPersistenceModel.password === password,
      posts: userPersistenceModel.posts.map(post => PostMapper.toDomain(post)),
      replies: userPersistenceModel.replies.map(reply =>
        ReplyMapper.toDomain(reply),
      ),
      likedReplies: userPersistenceModel.likedReplies.map(like =>
        LikeReplyMapper.toDomain(like),
      ),
    };
  }

  public static toPersistence(user: User): UserPersistence {
    const userPersistence = new UserPersistence();
    if (user.id !== null) {
      userPersistence.id = user.id;
    }
    userPersistence.firstName = user.firstName;
    userPersistence.lastName = user.lastName;
    userPersistence.email = user.email;
    userPersistence.username = user.username;
    userPersistence.password = user.password;
    userPersistence.role = user.role;
    userPersistence.createdAt = user.createdAt;
    userPersistence.updatedAt = user.updatedAt;
    userPersistence.deletedAt = user.deletedAt;
    userPersistence.likedReplies = user.likedReplies?.map(like =>
      LikeReplyMapper.toPersistence(like),
    ) as any[];
    userPersistence.comments = user.comments?.map(comment =>
      CommentMapper.toPersistence(comment),
    ) as CommentPersistence[];
    userPersistence.likedPosts = user.likedPosts?.map(like =>
      LikePostMapper.toPersistence(like),
    ) as any[];
    userPersistence.likedComments = user.likedComments?.map(like =>
      LikeCommentMapper.toPersistence(like),
    ) as any[];
    userPersistence.posts = user.posts?.map(post =>
      PostMapper.toPersistence(post),
    ) as any[];
    userPersistence.replies = user.replies?.map(reply =>
      ReplyMapper.toPersistence(reply),
    ) as any[];

    return userPersistence;
  }
}

export { UserMapper };
