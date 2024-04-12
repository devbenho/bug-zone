import { Comment } from '@domain/entities';

interface ICommentRepository {
  create(comment: Comment): Promise<Comment>;
  findByPostId(postId: string): Promise<Comment[]>;
  findById(commentId: string): Promise<Comment | null>;
  findByAuthor(authorId: string): Promise<Comment[]>;
  delete(commentId: string): Promise<void>;
  update(comment: Comment): Promise<Comment>;
}

export { ICommentRepository };
