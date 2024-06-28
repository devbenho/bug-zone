import { Post } from '@domain/entities';

abstract class PostRepository {
  abstract createPost(post: Post): Promise<Post>;
  abstract findPostById(postId: string): Promise<Post | null>;
  abstract findUserPosts(
    limit: number,
    page: number,
    userId: string,
  ): Promise<Post[]>;
  abstract findAll(limit: number, page: number): Promise<Post[]>;
  abstract findByTitle(title: string): Promise<Post | null>;
  abstract findByContent(content: string): Promise<Post | null>;
  abstract findByAuthor(authorId: string): Promise<Post | null>;
  // update(criteria: FindOptionsWhere<Post>, partialEntity: QueryDeepPartialEntity<Post>): Promise<UpdateResult>;
  // delete(criteria: FindOptionsWhere<Post>): Promise<DeleteResult>;
  // addEditor(postId: string, editorId: string): Promise<void>;
  // removeEditor(postId: string, editorId: string): Promise<void>;
}

export { PostRepository };
