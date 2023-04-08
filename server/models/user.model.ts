import { IUser } from '@bugzone/shared/types';
import { Db, MongoClient, Collection, ObjectId } from 'mongodb';

export class UserModel {
  private collection: Collection<IUser>;

  constructor(db: Db) {
    this.collection = db.collection<IUser>('users');
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await this.collection.findOne({ _id: new ObjectId(id) });
    return user;
  }
}
