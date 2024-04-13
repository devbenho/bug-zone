import { Nullable } from '@domain/types';
import { User } from '@domain/entities/user';
import { Comment } from '@domain/entities/comment';
import likePost
  from '@/infrastcuture/LikePosts/like-post.persistence';

export class Post {
  constructor(
    public id: Nullable<string>,
    public title: string,
    public content: string,
    public authorId: string,
    public author: User,
    public comments: Comment[],
    public likes: likePost[],
    public createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date,
  ) {}
}
