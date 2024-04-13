import { AuditableBaseEntity } from '@domain/shared/auditable.entity';

class Message extends AuditableBaseEntity {
  constructor(
    public userId: string,
    public chatId: string,
    public content: string,
    public read: boolean,
  ) {
    super(new Date(), userId, new Date(), userId, null, null);
  }
}

export { Message };
