import { BaseUseCase, UseCase } from '@application/shared';
import { findAllChatsResponseDto } from '@contracts/dtos/chats/find-all/find-all.response';
import { ChatRepository } from '@domain/entities';
import { FindAllChatsRequest } from './find-all.request';
import { Logger } from '@domain/shared';

@UseCase()
class FindAllChatsUseCase extends BaseUseCase<
  FindAllChatsRequest,
  findAllChatsResponseDto[]
> {
  private readonly _chatRepository: ChatRepository;
  constructor(chatRepository: ChatRepository) {
    super();
    this._chatRepository = chatRepository;
  }
  public async performOperation(): Promise<findAllChatsResponseDto[]> {
    const chats = await this._chatRepository.findAll();
    Logger.warn('chats from repo, ', chats);
    const mappedDtos = chats.map(chat => {
      return findAllChatsResponseDto.fromDomain(chat);
    });
    Logger.warn('mapper dtos, ', mappedDtos);
    return mappedDtos;
  }
}

export { FindAllChatsUseCase };
