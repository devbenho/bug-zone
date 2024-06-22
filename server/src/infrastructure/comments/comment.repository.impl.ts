import { Comment, CommentRepository } from '@domain/entities';
import { RepositoryDec } from '@infrastructure/shared/persistence/repository.decorator';
import { Repository } from 'typeorm';
import { CommentPersistence } from './comment.persistence';
import { appDataSource } from '@infrastructure/shared/persistence/data-source';
import { CommentMapper } from './comment.mapper';

@RepositoryDec({ type: CommentRepository })
class CommentRepositoryImp implements CommentRepository {
  private _repository: Repository<CommentPersistence> =
    appDataSource.getRepository(CommentPersistence);

  constructor() {
    this._repository = appDataSource.getRepository(CommentPersistence);
  }
  async create(comment: Comment): Promise<Comment> {
    const commentPersistence = CommentMapper.toPersistence(comment);
    const createdComment = await this._repository.save(commentPersistence);
    return CommentMapper.toDomain(createdComment, {
      user: await createdComment.user,
    });
  }
  async findByPostId(postId: string): Promise<Comment[]> {
    const comments = await this._repository.find({ where: { postId } });
    const mappedComments = await Promise.all(
      comments.map(async comment => {
        const user = await comment.user; // Assuming `comment.user` is a Promise
        return CommentMapper.toDomain(comment, { user });
      }),
    );
    return mappedComments;
  }
  async findById(commentId: string): Promise<Comment | null> {
    return this._repository
      .findOne({ where: { id: commentId } })
      .then(comment => (comment ? CommentMapper.toDomain(comment) : null));
  }
  async findByAuthor(authorId: string): Promise<Comment[]> {
    const comments = this._repository.find({ where: { userId: authorId } });
    return comments.then(comments =>
      comments.map(comment => CommentMapper.toDomain(comment)),
    );
  }
  async delete(commentId: string): Promise<boolean> {
    return this._repository
      .delete({ id: commentId })
      .then(result => result.affected === 1);
  }
  async update(comment: Comment): Promise<Comment> {
    const commentPersistence = CommentMapper.toPersistence(comment);
    const updatedComment = await this._repository.save(commentPersistence);

    return CommentMapper.toDomain(updatedComment, {
      user: await updatedComment.user,
    });
  }
}

export { CommentRepositoryImp };
