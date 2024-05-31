import { LikeReply, Reply, User } from '@domain/entities/';
import { Post } from '@domain/entities/';
import { Comment } from '@domain/entities';
import { LikePost } from '@domain/entities/';
import { UserPersistence, UserMapper } from '@infrastructure/users/';
import { PostPersistence, PostMapper } from '@infrastructure/posts/';
import { CommentPersistence, CommentMapper } from '@infrastructure/comments/';
import {
  LikePostPersistence,
  LikePostMapper,
} from '@infrastructure/like-posts/';
import { ReplyMapper, ReplyPersistence } from '@infrastructure/replies';
import {
  LikeReplyMapper,
  LikeReplyPersistence,
} from '@infrastructure/like-replies';
import {
  LikeCommentMapper,
  LikeCommentPersistence,
} from '@infrastructure/like-comments';
import { LikeComment } from '@domain/entities/like-comment';

class MapperFacade {
  static async toUserDomain(persistence: UserPersistence): Promise<User> {
    return await UserMapper.toDomain(persistence);
  }

  static async toUserPersistence(domain: User): Promise<UserPersistence> {
    return await UserMapper.toPersistence(domain);
  }

  static async toPostDomain(persistence: PostPersistence): Promise<Post> {
    return await PostMapper.toDomain(persistence);
  }

  static async toPostPersistence(domain: Post): Promise<PostPersistence> {
    return await PostMapper.toPersistence(domain);
  }

  static async toCommentDomain(
    persistence: CommentPersistence,
  ): Promise<Comment> {
    return await CommentMapper.toDomain(persistence);
  }

  static async toCommentPersistence(
    domain: Comment,
  ): Promise<CommentPersistence> {
    return await CommentMapper.toPersistence(domain);
  }

  static async toLikePostDomain(
    persistence: LikePostPersistence,
  ): Promise<LikePost> {
    return await LikePostMapper.toDomain(persistence);
  }

  static async toLikePostPersistence(
    domain: LikePost,
  ): Promise<LikePostPersistence> {
    return await LikePostMapper.toPersistence(domain);
  }

  static async toLikeCommentDomain(
    persistence: LikeCommentPersistence,
  ): Promise<LikeComment> {
    return await LikeCommentMapper.toDomain(persistence);
  }

  static async toLikeCommentPersistence(
    domain: LikeComment,
  ): Promise<LikeCommentPersistence> {
    return await LikeCommentMapper.toPersistence(domain);
  }

  static async toLikeReplyDomain(
    persistence: LikeReplyPersistence,
  ): Promise<LikeReply> {
    return await LikeReplyMapper.toDomain(persistence);
  }

  static async toLikeReplyPersistence(
    domain: LikeReply,
  ): Promise<LikeReplyPersistence> {
    return await LikeReplyMapper.toPersistence(domain);
  }

  static async toReplyDomain(persistence: ReplyPersistence): Promise<Reply> {
    return await ReplyMapper.toDomain(persistence);
  }

  static async toReplyPersistence(domain: Reply): Promise<ReplyPersistence> {
    return await ReplyMapper.toPersistence(domain);
  }
}

export { MapperFacade };
