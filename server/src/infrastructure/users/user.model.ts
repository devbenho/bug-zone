import { Nullable } from '@domain/shared';
import {Schema, model, Types} from 'mongoose';

interface IUserPersistence {         
  name: string;
  email: string;
  password: string;
  scope: Types.ObjectId;          
  createdAt: Date;
  createdBy: string;
  updatedAt: Nullable<Date>;
  updatedBy: Nullable<string>;
  deletedAt: Nullable<Date>;
}


const userSchema = new Schema<IUserPersistence>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  scope: { type: Schema.Types.ObjectId, ref: 'Scope', required: true },
  createdAt: { type: Date, required: true },
  createdBy: { type: String, required: true },
  updatedAt: { type: Date, required: false },
  updatedBy: { type: String, required: false },
  deletedAt: { type: Date, required: false },
});
const UserModel = model('User', userSchema);



export {  UserModel };


