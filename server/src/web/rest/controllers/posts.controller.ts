import { CreatePostRequest } from '@application/post';
import { BaseUseCase } from '@application/shared';
import { CreatePostResponseDto } from '@contracts/dtos/posts/create/create-post.response';
import { TriggeredByUser } from '@domain/shared/entities';
import { TYPES } from '@infrastructure/shared/ioc/types';
import { inject, injectable } from 'inversify';
import { ExpressHandler } from '../infrastucture/express-handler';
import BaseController from './base.controller';
import { LOGGER } from '../logger';
import { POST_STATUS } from '@domain/eums/post-status.enum';

@injectable()
export class PostsController implements BaseController {
  private _createPostUseCase: BaseUseCase<
    CreatePostRequest,
    CreatePostResponseDto
  >;
  constructor(
    @inject(TYPES.ICreatePostInputPort)
    _createPostInteractor: BaseUseCase<
      CreatePostRequest,
      CreatePostResponseDto
    >,
  ) {
    this._createPostUseCase = _createPostInteractor;
  }

  public create: ExpressHandler<CreatePostRequest, CreatePostResponseDto> =
    async (req, res) => {
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
      const result = await this._createPostUseCase.execute(request);
      return res.json(result);
    };
}
