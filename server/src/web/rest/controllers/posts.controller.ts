import { CreatePostRequest } from '@application/post';
import { BaseUseCase } from '@application/shared';
import { CreatePostResponseDto } from '@contracts/dtos/posts/create/create-post.response';
import { TriggeredByUser } from '@domain/shared/entities';
import { TYPES } from '@infrastructure/shared/ioc/types';
import { inject, injectable } from 'inversify';
import BaseController from './base.controller';
import { LOGGER } from '../logger';
import { POST_STATUS } from '@domain/eums/post-status.enum';
import { FindAllPostRequest } from '@application/post/find-all/find-all-post.request';
import { PostResponseDto } from '@contracts/dtos/posts';
import { log } from 'console';
import { ExpressHandler } from '../infrastructure/express-handler';

@injectable()
export class PostsController implements BaseController {
  private _createPostUseCase: BaseUseCase<
    CreatePostRequest,
    CreatePostResponseDto
  >;
  private _findAllPostUseCase: BaseUseCase<
    FindAllPostRequest,
    PostResponseDto[]
  >;

  constructor(
    @inject(TYPES.ICreatePostInputPort)
    createPostInteractor: BaseUseCase<CreatePostRequest, CreatePostResponseDto>,
    @inject(TYPES.IFindAllPostInputPort)
    findAllPostInteractor: BaseUseCase<FindAllPostRequest, PostResponseDto[]>,
  ) {
    this._createPostUseCase = createPostInteractor;
    this._findAllPostUseCase = findAllPostInteractor;
  }

  public create: ExpressHandler<CreatePostRequest, CreatePostResponseDto> =
    async (req: any, res: any) => {
      LOGGER.info('PostsController.create');
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({});
      }
      const request = CreatePostRequest.create(
        new TriggeredByUser(res.locals.userId, []),
        title!,
        content!,
        res.locals.user.id,
        res.locals.user,
        [],
        POST_STATUS.DRAFT,
      );
      log('request', request.toString());
      const result = await this._createPostUseCase.execute(request);
      log('result after creation', result);
      return res.json(result);
    };
  public findAll: ExpressHandler<FindAllPostRequest, PostResponseDto[]> =
    async (req: any, res: any) => {
      LOGGER.info('PostsController.findAll');
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const pageNumber = parseInt(req.query.pageNumber as string) || 1;

      const request = FindAllPostRequest.create(
        new TriggeredByUser(res.locals.userId, []),
        pageSize,
        pageNumber,
      );
      const result = await this._findAllPostUseCase.execute(request);
      return res.json(result);
    };
}
