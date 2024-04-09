import { AuditableBaseEntity } from '@domain/shared/auditable.entity';

export class Comment extends AuditableBaseEntity {
  constructor(
    public postId: string,
    public userId: string,
    public content: string,
  ) {
    super(new Date(), userId, new Date(), userId, null, null);
  }
}
