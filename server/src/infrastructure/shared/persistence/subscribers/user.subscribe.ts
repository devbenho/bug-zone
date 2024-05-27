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
    const { hashedPassword: password } = event.entity;
    const hashedPassword = await bcrypt.hash(password, 10);
    event.entity.hashedPassword = hashedPassword;
  }
}
