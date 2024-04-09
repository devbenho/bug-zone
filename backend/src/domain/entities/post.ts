import likePost from '@/infrastcuture/LikePosts/like-post.persistence';
import { Comment } from '@domain/entities/comment';
import { User } from '@domain/entities/user';
import { AuditableBaseEntity } from '@domain/shared/auditable.entity';

class Post extends AuditableBaseEntity {
  constructor(
    public title: string,
    public content: string,
    public authorId: string,
    public author: User,
    public comments: Comment[],
    public likes: likePost[],
  ) {
    super(new Date(), authorId, new Date(), authorId, null, null);
  }
}
export { Post };
