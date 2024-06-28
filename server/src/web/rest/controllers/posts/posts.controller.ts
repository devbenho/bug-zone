import { CreatePostRequest, CreatePostUseCase } from '@application/post';
import { TriggeredBy, TriggeredByUser } from '@domain/shared/entities';
import { FindAllPostRequest } from '@application/post/find-all/find-all-post.request';
import { RestController } from '../../infrastructure/rest-controller.decorator';
import { FindAllPostUseCase } from '@application/post/find-all/find-all-post.usecase';
import { Description, Get, Post, Returns, Summary, Title } from '@tsed/schema';
import { StatusCodes } from 'http-status-codes';
import { AllPostsApiResponse } from './all-posts.api-response';
import { BodyParams, Context, RawQueryParams } from '@tsed/common';
import { WithAuth } from '@web/rest/shared/with-auth.decorator';
import { AppConfig } from '@web/rest/config';
import { CreatedPostApiResponse } from './created-post.api-response';
import { ApiResponse } from '@web/rest/infrastructure/api-response-wrapper';

@RestController('/posts')
export class PostsController {
  private readonly _createPostUseCase: CreatePostUseCase;
  private readonly _findAllPostUseCase: FindAllPostUseCase;

  constructor(
    createPostUseCase: CreatePostUseCase,
    findAllPostUseCase: FindAllPostUseCase,
  ) {
    this._createPostUseCase = createPostUseCase;
    this._findAllPostUseCase = findAllPostUseCase;
  }

  @Post('/')
  @WithAuth()
  @Title('Create a post')
  @Summary('Create a post')
  @Description('Endpoint to create a new post')
  @Returns(StatusCodes.OK)
  public async create(
    @BodyParams('title') title: string,
    @BodyParams('content') content: string,
    @Context() ctx: Context,
  ): Promise<CreatedPostApiResponse> {
    const ctxBody = ctx.get(AppConfig.AUTHENTICATION_CONTEXT_KEY);
    const request = CreatePostRequest.create(
      new TriggeredByUser(ctxBody.userUuid, []),
      title!,
      content!,
      ctxBody.userUuid as string,
      [],
      'draft',
    );
    const result = await this._createPostUseCase.execute(request);
    return CreatedPostApiResponse.fromCreatedPost(result);
  }

  @Get('/')
  @Title('Find all posts')
  @Summary('Find all posts')
  @Returns(StatusCodes.OK, ApiResponse<AllPostsApiResponse[]>)
  public async findAll(
    @RawQueryParams('pageSize') pageSize: string,
    @RawQueryParams('pageNumber') pageNumber: string,
    @Context(AppConfig.TRIGGERED_BY_CONTEXT_KEY) triggeredBy: TriggeredBy,
  ): Promise<ApiResponse<AllPostsApiResponse[]>> {
    const request = FindAllPostRequest.create(
      triggeredBy,
      parseInt(pageSize),
      parseInt(pageNumber),
    );
    try {
      const result = await this._findAllPostUseCase.execute(request);
      const responseData = result.map(post =>
        AllPostsApiResponse.fromPostResponse(post),
      );

      return ApiResponse.success(responseData, 'Posts retrieved successfully');
    } catch (error) {
      return ApiResponse.failure<AllPostsApiResponse[]>(
        'Failed to retrieve posts',
      );
    }
  }
}
