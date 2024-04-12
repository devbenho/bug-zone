import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from "typeorm";
import UserPersistence from "../../../users/user.persistence";
import bcrypt from "bcrypt";
@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return UserPersistence;
  }

  async beforeInsert(event: InsertEvent<UserPersistence>) {
    const { password } = event.entity;
    const hashedPassword = await bcrypt.hash(password, 10);
    event.entity.password = hashedPassword;
  }
}
