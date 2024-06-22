import { Comment } from '@domain/entities';

abstract class CommentRepository {
  abstract create(comment: Comment): Promise<Comment>;
  abstract findByPostId(postId: string): Promise<Comment[]>;
  abstract findById(commentId: string): Promise<Comment | null>;
  abstract findByAuthor(authorId: string): Promise<Comment[]>;
  abstract delete(commentId: string): Promise<boolean>;
  abstract update(comment: Comment): Promise<Comment>;
}

export { CommentRepository };
