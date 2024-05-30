import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { injectable } from 'inversify';
import { Post } from '@domain/entities';
import { IPostRepository } from '@domain/repositories/post.repository';
import { PostPersistence } from './post.persistence';
import { PostMapper } from './post.mapper';
import { LOGGER } from '@/web/rest/logger';
import { log } from 'console';

@injectable()
export class PostRepository implements IPostRepository {
  private _repository: Repository<PostPersistence>;

  constructor(private readonly dataSource: DataSource) {
    this._repository = this.dataSource.getRepository(PostPersistence);
  }
  async findByAuthor(authorId: string): Promise<Post | null> {
    const post = await this._repository.findOne({ where: { authorId } });
    return post ? PostMapper.toDomain(post) : null;
  }

  async createPost(post: Post): Promise<Post> {
    const postPersistence = await PostMapper.toPersistence(post);
    const createdPost = await this._repository.save(postPersistence);
    return PostMapper.toDomain(createdPost);
  }

  async findPostById(postId: string): Promise<Post | null> {
    const post = await this._repository.findOne({ where: { id: postId } });
    return post ? PostMapper.toDomain(post) : null;
  }

  async findUserPosts(
    limit: number,
    page: number,
    userId: string,
  ): Promise<Post[]> {
    const [posts, count] = await this._repository.findAndCount({
      where: { authorId: userId },
      take: limit,
      skip: (page - 1) * limit,
    });

    const postPromises = posts.map(post => PostMapper.toDomain(post));
    return Promise.all(postPromises);
  }

  async findAll(limit: number, page: number): Promise<Post[]> {
    const [posts, count] = await this._repository.findAndCount();
    const postPromises = posts.map(post => PostMapper.toDomain(post));
    return Promise.all(postPromises);
  }

  async findByTitle(title: string): Promise<Post | null> {
    const post = await this._repository.findOne({ where: { title } });
    return post ? PostMapper.toDomain(post) : null;
  }

  async findByContent(content: string): Promise<Post | null> {
    const post = await this._repository.findOne({ where: { content } });
    return post ? PostMapper.toDomain(post) : null;
  }

  // Optionally, if you need to implement the update and delete methods:
  async updatePost(
    postId: string,
    partialEntity: QueryDeepPartialEntity<PostPersistence>,
  ): Promise<UpdateResult> {
    return this._repository.update(postId, partialEntity);
  }

  async deletePost(postId: string): Promise<DeleteResult> {
    return this._repository.delete(postId);
  }
}
