import { RestController } from '../../infrastructure/rest-controller.decorator';
import { Description, Get, Post, Returns, Summary, Title } from '@tsed/schema';
import { StatusCodes } from 'http-status-codes';
import { BodyParams, Context, RawQueryParams } from '@tsed/common';
import { WithAuth } from '@web/rest/shared/with-auth.decorator';
import { AppConfig } from '@web/rest/config';
import { ApiResponse } from '@web/rest/infrastructure/api-response-wrapper';
import {
  CreateCommentRequest,
  CreateCommentUseCase,
  FindCommentsByPostIdRequest,
  FindCommentsByPostIdUseCase,
} from '@application/comment';
import { CreatedCommentApiResponse } from './created-comment.api-response';
import { AllCommentsApiResponse } from './all-comments.api-response';
import { TriggeredByUser } from '@domain/shared/entities';
import { Logger } from '@domain/shared';

@RestController('/comments')
export class CommentsController {
  private readonly _createCommentUseCase: CreateCommentUseCase;
  private readonly _findCommentsByPostIdUseCase: FindCommentsByPostIdUseCase;

  constructor(
    createCommentUseCase: CreateCommentUseCase,
    findCommentsByPostId: FindCommentsByPostIdUseCase,
  ) {
    this._createCommentUseCase = createCommentUseCase;
    this._findCommentsByPostIdUseCase = findCommentsByPostId;
  }

  @Post('/')
  @WithAuth()
  @Title('Create a comment')
  @Summary('Create a comment')
  @Description('Endpoint to create a new comment')
  @Returns(StatusCodes.OK, ApiResponse<CreatedCommentApiResponse>)
  public async create(
    @BodyParams('content') content: string,
    @BodyParams('postId') postId: string,
    @Context() ctx: Context,
  ): Promise<ApiResponse<CreatedCommentApiResponse>> {
    const ctxBody = ctx.get(AppConfig.AUTHENTICATION_CONTEXT_KEY);
    const request = CreateCommentRequest.create(
      ctxBody.userUuid,
      postId,
      content,
    );
    const response = await this._createCommentUseCase.execute(request);
    return ApiResponse.success(
      CreatedCommentApiResponse.fromCommentResponseDto(response),
    );
  }

  @Get('/')
  @Title('Find all comments')
  @Summary('Find all comments')
  @Returns(StatusCodes.OK, ApiResponse<AllCommentsApiResponse[]>)
  public async findAll(
    @RawQueryParams('pageSize') pageSize: string,
    @RawQueryParams('pageNumber') pageNumber: string,
    @RawQueryParams('postId') postId: string,
  ): Promise<ApiResponse<AllCommentsApiResponse[]>> {
    const request = FindCommentsByPostIdRequest.create(
      new TriggeredByUser('123', []),
      postId,
      parseInt(pageSize),
      parseInt(pageNumber),
    );

    const result = await this._findCommentsByPostIdUseCase.execute(request);
    Logger.info('CommentsController.findAll', result);
    return ApiResponse.success(
      result.map(comment =>
        AllCommentsApiResponse.fromCommentResponseDto(comment),
      ),
    );
  }
}
