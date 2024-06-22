import { BaseUseCase, UseCase } from '@application/shared';
import { FindCommentsByPostIdRequest } from './get-by-post-id-comment.request';
import { CommentResponseDto } from '@contracts/dtos/comments';
import { CommentRepository } from '@domain/entities';
import { Long } from 'typeorm';
import { Logger } from '@domain/shared';

@UseCase()
class FindCommentsByPostIdUseCase extends BaseUseCase<
  FindCommentsByPostIdRequest,
  CommentResponseDto[]
> {
  private readonly _commentRepository: CommentRepository;
  constructor(commentRepository: CommentRepository) {
    super();
    this._commentRepository = commentRepository;
  }

  public async performOperation(
    request: FindCommentsByPostIdRequest,
  ): Promise<CommentResponseDto[]> {
    Logger.info('Get comments by post id');
    const comments = await this._commentRepository.findByPostId(request.postId);
    Logger.info('Get comments by post id', comments);

    return comments.map(comment => CommentResponseDto.fromEntity(comment));
  }
}

export { FindCommentsByPostIdUseCase };
