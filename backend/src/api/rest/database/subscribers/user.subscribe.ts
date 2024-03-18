import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from "typeorm";
import User from "../entities/user.entity";
import bcrypt from "bcrypt";
@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    const { password } = event.entity;
    const hashedPassword = await bcrypt.hash(password, 10);
    event.entity.password = hashedPassword;
  }
}
