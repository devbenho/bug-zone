import { AuditableBaseEntity } from '@domain/shared/auditable.entity';

class Chat extends AuditableBaseEntity {
  constructor(
    public ownerId: string,
    public participants: string[],
  ) {
    super(new Date(), ownerId, new Date(), ownerId, null, null);
  }
}

export { Chat };
