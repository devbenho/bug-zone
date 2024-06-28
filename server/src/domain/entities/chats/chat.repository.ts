import { Nullable } from '@domain/shared';
import { Chat } from './chat';

abstract class ChatRepository {
  abstract findAll(): Promise<Chat[]>;
  abstract getById(id: string): Promise<Nullable<Chat>>;
  abstract create(chat: Chat): Promise<Chat>;
  abstract update(chat: Chat): Promise<Nullable<Chat>>;
}

export { ChatRepository };
