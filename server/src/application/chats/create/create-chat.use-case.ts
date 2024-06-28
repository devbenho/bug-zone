import { BaseUseCase, UseCase } from '@application/shared';
import { Chat, ChatRepository } from '@domain/entities/chats';
import { CreateChatRequest } from './create-chat.request';
import { UserRepository } from '@domain/entities';

@UseCase()
class CreateChatUseCase extends BaseUseCase<CreateChatRequest, boolean> {
  private readonly _chatRepository: ChatRepository;
  private readonly _userRepository: UserRepository;
  constructor(chatRepository: ChatRepository, userRepository: UserRepository) {
    super();
    this._chatRepository = chatRepository;
    this._userRepository = userRepository;
  }
  protected async performOperation(
    request: CreateChatRequest,
  ): Promise<boolean> {
    const participants = await this._userRepository.findAllByUserIds(
      request.participantsIds,
    );
    const owner = await this._userRepository.findById(request.ownerId);
    const chat = Chat.create(
      null,
      request.ownerId,
      owner,
      request.participantsIds,
      participants,
      request.name || 'unknown',
      new Date(),
      request.triggeredBy.who,
      null,
      null,
      null,
      null,
    );
    const createdChat = await this._chatRepository.create(chat);
    return !!createdChat;
  }
}

export { CreateChatUseCase };
