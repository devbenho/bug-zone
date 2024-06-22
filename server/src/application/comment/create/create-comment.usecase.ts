import { BaseUseCase, UseCase } from '@application/shared';
import { CreateCommentRequest } from './create-comment.request';
import { CommentResponseDto } from '@contracts/dtos/comments';
import { Comment, CommentRepository } from '@domain/entities';
import { Long } from 'typeorm';
import { Logger } from '@domain/shared';

@UseCase()
class CreateCommentUseCase extends BaseUseCase<
  CreateCommentRequest,
  CommentResponseDto
> {
  private readonly _commentRepository: CommentRepository;
  constructor(commentRepository: CommentRepository) {
    super();
    this._commentRepository = commentRepository;
  }

  public async performOperation(
    request: CreateCommentRequest,
  ): Promise<CommentResponseDto> {
    const comment: Comment = Comment.create(
      null,
      request.postId,
      null,
      request.triggeredBy.toString(),
      null,
      request.content,
      new Date(),
      new Date(),
      null,
    );

    const createdComment = await this._commentRepository.create(comment);
    return CommentResponseDto.fromEntity(createdComment);
  }
}

export { CreateCommentUseCase };
