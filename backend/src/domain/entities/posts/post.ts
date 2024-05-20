import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { User } from '../user';
import { LikePost } from '../like-post';
import { Comment } from '../comment';
import { Nullable } from '@domain/types';

class Post extends AuditableBaseEntity {
  public author: User;
  public comments: Nullable<Promise<Comment[]>>;
  public likes: Nullable<Promise<LikePost[]>>;
  public status: string;

  constructor(
    public title: string,
    public content: string,
    public authorId: string,
    author: User,
    comments: Comment[],
    likes: LikePost[],
  ) {
    super(new Date(), authorId, new Date(), authorId, null, null);
    this.author = author;
    this.comments = comments.length ? Promise.resolve(comments) : null;
    this.likes = likes.length ? Promise.resolve(likes) : null;
    this.status = 'active';
  }

  public static create(
    title: string,
    content: string,
    authorId: string,
    author: User,
  ): Post {
    return new Post(title, content, authorId, author, [], []);
  }
}

export { Post };
