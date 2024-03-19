import {
  DataSource,
  DeleteResult,
  EntityRepository,
  FindOptionsWhere,
  ObjectId,
  Repository,
  UpdateResult,
} from 'typeorm';
import Post from '../database/entities/post.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { injectable } from 'inversify';

@injectable()
export class PostRepository extends Repository<Post> {
  constructor(dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }
  createPost(post: Post) {
    return this.createQueryBuilder('post').insert().values(post).execute();
  }
  findPostById(postId: string) {
    return this.createQueryBuilder('post').where('post.id = :postId', { postId }).getOne();
  }
  findUserPosts(limit: number, page: number, userId: string) {
    return this.createQueryBuilder('post')
      .where('post.authorId = :userId', { userId })
      .orWhere('post.editors = :userId', { userId })
      .take(limit || 10)
      .skip(page * limit)
      .getMany();
  }
  findAll(limit: number, page: number) {
    return this.createQueryBuilder('post')
      .take(limit || 10)
      .skip(page * limit)
      .getMany();
  }
  findByTitle(title: string) {
    return this.createQueryBuilder('post').where('post.title = :title', { title }).getOne();
  }
  findByContent(content: string) {
    return this.createQueryBuilder('post').where('post.content = :content', { content }).getOne();
  }
  findByAuthor(authorId: string) {
    return this.createQueryBuilder('post').where('post.authorId = :author', { authorId }).getOne();
  }
  update(
    criteria: FindOptionsWhere<Post>,
    partialEntity: QueryDeepPartialEntity<Post>
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
    return this.createQueryBuilder('post').relation(Post, 'editors').of(postId).add(editorId);
  }
  removeEditor(postId: string, editorId: string) {
    return this.createQueryBuilder('post').relation(Post, 'editors').of(postId).remove(editorId);
  }
}
