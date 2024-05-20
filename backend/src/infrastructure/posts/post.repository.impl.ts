import {
  DataSource,
  DeleteResult,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { injectable } from 'inversify';
import { Post } from '@domain/entities';
import { IPostRepository } from '@domain/repositories/post.repository';

@injectable()
export class PostRepositoryImpl
  extends Repository<Post>
  implements IPostRepository
{
  constructor(dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  async createPost(post: Post): Promise<Post> {
    return this.save(post);
  }

  async findPostById(postId: string): Promise<Post | null> {
    return this.createQueryBuilder('post')
      .where('post.id = :postId', { postId })
      .getOne();
  }

  async findUserPosts(limit: number, page: number, userId: string) {
    return this.createQueryBuilder('post')
      .where('post.authorId = :userId', { userId })
      .orWhere('post.editors = :userId', { userId })
      .take(limit || 10)
      .skip(page * limit)
      .getMany();
  }

  async findAll(limit: number, page: number) {
    return this.createQueryBuilder('post')
      .take(limit || 10)
      .skip(page * limit)
      .getMany();
  }

  async findByTitle(title: string): Promise<Post | null> {
    return this.createQueryBuilder('post')
      .where('post.title = :title', { title })
      .getOne();
  }

  async findByContent(content: string): Promise<Post | null> {
    return this.createQueryBuilder('post')
      .where('post.content = :content', { content })
      .getOne();
  }

  async findByAuthor(authorId: string): Promise<Post | null> {
    return this.createQueryBuilder('post')
      .where('post.authorId = :author', { authorId })
      .getOne();
  }

  async update(
    criteria: FindOptionsWhere<Post>,
    partialEntity: QueryDeepPartialEntity<Post>,
  ): Promise<UpdateResult> {
    return this.createQueryBuilder('post')
      .update(Post)
      .set(partialEntity)
      .where(criteria)
      .execute();
  }

  delete(criteria: FindOptionsWhere<Post>): Promise<DeleteResult> {
    return this.createQueryBuilder('post').delete().where(criteria).execute();
  }

  addEditor(postId: string, editorId: string) {
    return this.createQueryBuilder('post')
      .relation(Post, 'editors')
      .of(postId)
      .add(editorId);
  }

  removeEditor(postId: string, editorId: string) {
    return this.createQueryBuilder('post')
      .relation(Post, 'editors')
      .of(postId)
      .remove(editorId);
  }
}
