import { UserResponseDto } from '@contracts/dtos/users';
import { Chat } from '@domain/entities';
import { Nullable } from '@domain/shared';

class findAllChatsResponseDto {
  id: string;
  name: string;
  ownerId: string;
  owner: UserResponseDto;
  participantsIds: string[];
  participants: UserResponseDto[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Nullable<Date>;

  constructor(
    id: string,
    name: string,
    ownerId: string,
    owner: UserResponseDto,
    participantsIds: string[],
    participants: UserResponseDto[],
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Nullable<Date>,
  ) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.owner = owner;
    this.participantsIds = participantsIds;
    this.participants = participants;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  public static create(
    id: string,
    name: string,
    ownerId: string,
    owner: UserResponseDto,
    participantsIds: string[],
    participants: UserResponseDto[],
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Nullable<Date>,
  ): findAllChatsResponseDto {
    return new findAllChatsResponseDto(
      id,
      name,
      ownerId,
      owner,
      participantsIds,
      participants,
      createdAt,
      updatedAt,
      deletedAt,
    );
  }

  public static fromDomain(chat: Chat): findAllChatsResponseDto {
    return new findAllChatsResponseDto(
      chat.id as string,
      chat.name,
      chat.ownerId,
      chat.owner as UserResponseDto,
      chat.participantsIds,
      chat.participants as UserResponseDto[],
      chat.createdAt,
      chat.updatedAt as Date,
      chat.deletedAt,
    );
  }
}

export { findAllChatsResponseDto };
