import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { Nullable } from '@domain/shared/types';
import { User } from '../users';

class Chat extends AuditableBaseEntity {
  constructor(
    public id: Nullable<string>,
    public ownerId: string,
    public owner: Nullable<User>,
    public participantsIds: string[],
    public participants: Nullable<User>[],
    public name: string,
    public createdAt: Date,
    public createdBy: string,
    public updatedAt: Nullable<Date>,
    public updatedBy: Nullable<string>,
    public deletedAt: Nullable<Date>,
    public deletedBy: Nullable<string>,
  ) {
    super(id, createdAt, createdBy, updatedAt, updatedBy, deletedAt, deletedBy);
  }

  public equals(entity: AuditableBaseEntity): boolean {
    return this.id === entity.id;
  }

  public static create(
    id: Nullable<string>,
    ownerId: string,
    owner: Nullable<User>,
    participantsIds: string[],
    participants: Nullable<User>[],
    name: string,
    createdAt: Date,
    createdBy: string,
    updatedAt: Nullable<Date>,
    updatedBy: Nullable<string>,
    deletedAt: Nullable<Date>,
    deletedBy: Nullable<string>,
  ): Chat {
    return new Chat(
      id,
      ownerId,
      owner,
      participantsIds,
      participants,
      name,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
      deletedAt,
      deletedBy,
    );
  }
}

export { Chat };
