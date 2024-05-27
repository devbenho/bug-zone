import { CreatePostRequest } from '@application/post';
import { BaseUseCase } from '@application/shared';
import { CreatePostResponseDto } from '@contracts/dtos/posts/create/create-post.response';
import { TriggeredByUser } from '@domain/shared/entities';
import { TYPES } from '@infrastructure/shared/ioc/types';
import { inject, injectable } from 'inversify';
import { ExpressHandler } from '../infrastucture/express-handler';
import BaseController from './base.controller';
import { POST_STATUS } from '@domain/eums/post-status.enum';
<<<<<<< HEAD
import { FindAllPostRequest } from '@application/post/find-all/find-all-post.request';
import { PostResponseDto } from '@contracts/dtos/posts';
=======
import { log } from 'console';
>>>>>>> 9816199 (Post creation works (User mapping bug))

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
    _createPostInteractor: BaseUseCase<
      CreatePostRequest,
      CreatePostResponseDto
    >,
    @inject(TYPES.IFindAllPostInputPort)
    _findAllPostInteractor: BaseUseCase<FindAllPostRequest, PostResponseDto[]>,
  ) {
    this._createPostUseCase = _createPostInteractor;
    this._findAllPostUseCase = _findAllPostInteractor;
  }

  public create: ExpressHandler<CreatePostRequest, CreatePostResponseDto> =
    async (req, res) => {
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
      const result = await this._createPostUseCase.execute(request);
      return res.json(result);
    };

  public findAll: ExpressHandler<FindAllPostRequest, PostResponseDto[]> =
    async (req, res) => {
      LOGGER.info('PostsController.findAll');
      const request = FindAllPostRequest.create(
        new TriggeredByUser(res.locals.userId, []),
        req.query.pageSize || 10,
        req.query.pageNumber || 1,
      );
      const result = await this._findAllPostUseCase.execute(request);
      return result;
    };
}
