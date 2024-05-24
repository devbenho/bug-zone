import { User } from '@domain/entities/user';
import { UserPersistence } from './user.persistence';
import { injectable } from 'inversify';
import { CommentMapper, CommentPersistence, LikeCommentMapper, LikeReplyMapper, PostMapper, ReplyMapper } from '..';
import { Comment } from '@domain/entities';
import { LikePostMapper } from '@infrastructure/like-posts/like-post.mapper';
@injectable()
class UserMapper {
  public static toDomain(userPersistenceModel: UserPersistence): User {
    const { id, } = userPersistenceModel;
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
      comments: userPersistenceModel.comments.map(comment => CommentMapper.toDomain(comment)),
      likedPosts: userPersistenceModel.likedPosts.map(like => {
        return LikePostMapper.toDomain(like);
      }),
      likeComments: userPersistenceModel.likedComments.map(like => LikeCommentMapper.toDomain(like)),
      equals: (user: User) => user.id === id,
      role: userPersistenceModel.role,
      createdBy: userPersistenceModel.id as string,
      updatedBy: userPersistenceModel.id,
      deletedBy: userPersistenceModel.id,
      isPasswordMatched: (password: string) => userPersistenceModel.password === password,
      posts: userPersistenceModel.posts.map(post => PostMapper.toDomain(post)),
      replies: userPersistenceModel.replies.map(reply => ReplyMapper.toDomain(reply)),
      likeReplies: userPersistenceModel.likedReplies.map(like => LikeReplyMapper.toDomain(like))
    }
  }

  public static toPersistence(user: User): UserPersistence {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      likedReplies: user.likeReplies?.map(
        like => LikeReplyMapper.toPersistence(like)
      ) as any[], // Add likedReplies property
      comments: user.comments?.map(comment => CommentMapper.toPersistence(comment)) as CommentPersistence[],
      likedPosts: user.likedPosts?.map(like => LikePostMapper.toPersistence(like)) as any[],
      likedComments: user.likeComments?.map(like => LikeCommentMapper.toPersistence(like)) as any[],
      posts: user.posts?.map(post => PostMapper.toPersistence(post)) as any[],
      replies: user.replies?.map(reply => ReplyMapper.toPersistence(reply)) as any[],
    }
  }
}

export { UserMapper };
