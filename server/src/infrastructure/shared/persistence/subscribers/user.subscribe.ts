import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { UserPersistence } from '@infrastructure/users';
@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return UserPersistence;
  }

  async beforeInsert(event: InsertEvent<UserPersistence>) {
    const { hashedPassword } = event.entity;
    const hash = await bcrypt.hash(hashedPassword, 10);
    event.entity.hashedPassword = hash;
  }
}
