import { Post } from '@domain/entities';

export interface IPostRepository {
  createPost(post: Post): Promise<Post>;
  findPostById(postId: string): Promise<Post | null>;
  findUserPosts(limit: number, page: number, userId: string): Promise<Post[]>;
  findAll(limit: number, page: number): Promise<Post[]>;
  findByTitle(title: string): Promise<Post | null>;
  findByContent(content: string): Promise<Post | null>;
  findByAuthor(authorId: string): Promise<Post | null>;
  // update(criteria: FindOptionsWhere<Post>, partialEntity: QueryDeepPartialEntity<Post>): Promise<UpdateResult>;
  // delete(criteria: FindOptionsWhere<Post>): Promise<DeleteResult>;
  // addEditor(postId: string, editorId: string): Promise<void>;
  // removeEditor(postId: string, editorId: string): Promise<void>;
}