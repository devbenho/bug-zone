import { findAllChatsResponseDto } from '@contracts/dtos/chats/find-all/find-all.response';
import { Property } from '@tsed/schema';

class UserDetails {
  @Property()
  public id: string;

  @Property()
  public firstName: string;

  @Property()
  public lastName: string;

  @Property()
  public username: string;

  @Property()
  public email: string;

  @Property()
  public pictureProfile?: string;

  @Property()
  public roles?: string[];

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    username: string,
    pictureProfile?: string,
    roles?: string[],
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.pictureProfile = pictureProfile;
    this.roles = roles;
  }
}

class FindAllChatsApiResponse {
  @Property()
  readonly uuid: string;

  @Property()
  readonly name: string;

  @Property()
  readonly participantsIds: string[];

  @Property()
  readonly participants: UserDetails[];

  @Property()
  readonly createdAt: Date;

  @Property()
  readonly updatedAt: Date;

  @Property()
  readonly deletedAt?: Date;

  private constructor(
    uuid: string,
    name: string,
    participantsIds: string[],
    participants: UserDetails[],
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date,
  ) {
    this.uuid = uuid;
    this.name = name;
    this.participantsIds = participantsIds;
    this.participants = participants;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  public static create(
    uuid: string,
    name: string,
    participantsIds: string[],
    participants: UserDetails[],
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date,
  ): FindAllChatsApiResponse {
    return new FindAllChatsApiResponse(
      uuid,
      name,
      participantsIds,
      participants,
      createdAt,
      updatedAt,
      deletedAt,
    );
  }
  public static fromChatResponse(
    dto: findAllChatsResponseDto,
  ): FindAllChatsApiResponse {
    return new FindAllChatsApiResponse(
      dto.id,
      dto.name,
      dto.participantsIds,
      dto.participants,
      dto.createdAt,
      dto.updatedAt,
      dto.deletedAt as Date,
    );
  }
}

export { FindAllChatsApiResponse };
