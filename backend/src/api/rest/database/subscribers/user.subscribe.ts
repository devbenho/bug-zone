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

  afterInsert(event: InsertEvent<User>) {
    console.log(`AFTER USER INSERTED: `, event.entity);
  }

  beforeUpdate(event: UpdateEvent<User>) {
    console.log(`BEFORE USER UPDATED: `, event.entity);
  }

  afterUpdate(event: UpdateEvent<User>) {
    console.log(`AFTER USER UPDATED: `, event.entity);
  }

  beforeRemove(event: RemoveEvent<User>) {
    console.log(`BEFORE USER REMOVED: `, event.entity);
  }

  afterRemove(event: RemoveEvent<User>) {
    console.log(`AFTER USER REMOVED: `, event.entity);
  }
}
