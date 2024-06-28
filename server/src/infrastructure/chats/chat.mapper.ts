import { Chat, User } from '@domain/entities';
import { ChatPersistence } from './chat.persistence';
import { UserMapper, UserPersistence } from '@infrastructure/users';

class ChatMapper {
  public static toDomain(
    chatPersistence: ChatPersistence,
    lazyEntities?: {
      owner?: UserPersistence;
      paticipants?: UserPersistence[];
    },
  ): Chat {
    const domainOwner = lazyEntities?.owner
      ? UserMapper.toDomain(lazyEntities.owner)
      : null;

    const domainParticipants = (lazyEntities?.paticipants ?? []).map(
      participant => UserMapper.toDomain(participant),
    );
    const participantsIds = domainParticipants
      ? domainParticipants.map(p => p.id)
      : (async () => {
          const parts = await chatPersistence.participants;
          return parts.map(p => p.id);
        })();

    return Chat.create(
      chatPersistence.id,
      chatPersistence.ownerId,
      domainOwner as User,
      participantsIds as string[],
      domainParticipants,
      chatPersistence.name,
      chatPersistence.createdAt,
      chatPersistence.ownerId,
      chatPersistence.updatedAt,
      chatPersistence.ownerId,
      chatPersistence.deletedAt,
      chatPersistence.ownerId,
    );
  }

  public static toPersistence(chatDomain: Chat) {
    const chatPersistence = new ChatPersistence();

    if (chatDomain.id != null) {
      chatPersistence.id = chatDomain.id;
    }

    chatPersistence.ownerId = chatDomain.ownerId;
    const domainParticipants = chatDomain.participants.map(participant =>
      UserMapper.toPersistence(participant as User),
    );
    if (chatDomain.owner) {
      chatPersistence.owner = Promise.resolve(
        UserMapper.toPersistence(chatDomain.owner),
      );
    }
    chatPersistence.name = chatDomain.name;
    chatPersistence.createdAt = chatDomain.createdAt;
    chatPersistence.deletedAt = chatDomain.deletedAt;
    chatPersistence.participants = Promise.all(domainParticipants);
    return chatPersistence;
  }
}

export { ChatMapper };
