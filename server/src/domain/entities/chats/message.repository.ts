import { Message } from './message';

abstract class MessageRepository {
  abstract create(message: Message): Message;
  abstract deleteById(id: string): boolean;
}

export { MessageRepository };
