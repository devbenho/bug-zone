import { CreateChatRequest } from '@application/chats/create/create-chat.request';
import { CreateChatUseCase } from '@application/chats/create/create-chat.use-case';
import { FindAllChatsRequest } from '@application/chats/find-all/find-all.request';
import { FindAllChatsUseCase } from '@application/chats/find-all/find-all.use-case';
import { TriggeredBy } from '@domain/shared/entities';
import { BodyParams, Context } from '@tsed/common';
import { Description, Get, Post, Returns, Tags } from '@tsed/schema';
import { AppConfig } from '@web/rest/config';
import { ApiResponse } from '@web/rest/infrastructure/api-response-wrapper';
import { RestController } from '@web/rest/infrastructure/rest-controller.decorator';
import { WithAuth } from '@web/rest/shared/with-auth.decorator';
import { StatusCodes } from 'http-status-codes';
import { FindAllChatsApiResponse } from './find-all-chats.api-response';
import { Logger } from '@domain/shared';

@RestController('/chats')
@Tags('Chats')
@Description('Create a chat')
class ChatsController {
  private readonly _createChatUseCase: CreateChatUseCase;
  private readonly _findAllChatsUseCase: FindAllChatsUseCase;
  constructor(
    createChatUseCase: CreateChatUseCase,
    findAllChatsUseCase: FindAllChatsUseCase,
  ) {
    this._createChatUseCase = createChatUseCase;
    this._findAllChatsUseCase = findAllChatsUseCase;
  }
  @Post('/')
  @WithAuth()
  async createChat(
    @BodyParams('participants') participants: string[],
    @BodyParams('chatName') chatName: string,
    @Context(AppConfig.TRIGGERED_BY_CONTEXT_KEY) triggeredBy: TriggeredBy,
    @Context() ctx: Context,
  ): Promise<boolean> {
    const ctxBody = ctx.get(AppConfig.AUTHENTICATION_CONTEXT_KEY);
    const request = CreateChatRequest.create(
      triggeredBy,
      ctxBody.userUuid as string,
      participants,
      chatName,
    );
    const result = await this._createChatUseCase.execute(request);
    return result;
  }

  @Get('/')
  @WithAuth()
  @Returns(StatusCodes.OK, ApiResponse<FindAllChatsApiResponse[]>)
  async findAllChats(
    @Context(AppConfig.TRIGGERED_BY_CONTEXT_KEY)
    triggeredBy: TriggeredBy,
  ): Promise<ApiResponse<FindAllChatsApiResponse[]>> {
    const request = FindAllChatsRequest.create(triggeredBy);
    const result = await this._findAllChatsUseCase.execute(request);
    const response = ApiResponse.success(
      result.map(FindAllChatsApiResponse.fromChatResponse),
    ) as ApiResponse<FindAllChatsApiResponse[]>;
    return response;
  }
}

export { ChatsController };
