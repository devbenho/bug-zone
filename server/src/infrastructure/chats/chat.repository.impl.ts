import { Chat, ChatRepository } from '@domain/entities';
import { Nullable } from '@domain/shared';
import { ChatPersistence } from './chat.persistence';
import { appDataSource } from '@infrastructure/shared/persistence/data-source';
import { Repository } from 'typeorm';
import { ChatMapper } from './chat.mapper';
import { RepositoryDec } from '@infrastructure/shared/persistence/repository.decorator';

@RepositoryDec({ type: ChatRepository })
class ChatRepositoryImpl implements ChatRepository {
  private _repository: Repository<ChatPersistence> =
    appDataSource.getRepository(ChatPersistence);

  async getById(id: string): Promise<Nullable<Chat>> {
    const chat = this._repository.findOne({ where: { id } });
    return chat.then(async chat => {
      if (!chat) return null;
      return ChatMapper.toDomain(chat);
    });
  }

  async findAll(): Promise<Chat[]> {
    const chats = await this._repository.find();

    const domainChats = await Promise.all(
      chats.map(async chat =>
        ChatMapper.toDomain(chat, {
          owner: await chat.owner,
          paticipants: await chat.participants,
        }),
      ),
    );

    return domainChats;
  }
  async create(chat: Chat): Promise<Chat> {
    const chatPersistence = ChatMapper.toPersistence(chat);
    const createdChat = await this._repository.save(chatPersistence);
    return ChatMapper.toDomain(createdChat);
  }

  async update(chat: Chat): Promise<Nullable<Chat>> {
    const chatPersistence = ChatMapper.toPersistence(chat);
    return this._repository
      .save(chatPersistence)
      .then(chat => ChatMapper.toDomain(chat));
  }
}

export { ChatRepositoryImpl };
