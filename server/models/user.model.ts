import { Model, Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

interface IUser {
  username: string
  email: string
  password: string
}

// Put all user instance methods in this interface:
interface IUserMethods {
  passwordMatch(pw: string): boolean
}

// Create a new Model type that knows about IUserMethods...
type UserModel = Model<IUser, {}, IUserMethods>

// And a schema that knows about IUserMethods
const schema = new Schema<IUser, UserModel, IUserMethods>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

schema.pre('save', async function (next) {
  const user = this

  if (!user.isModified('password')) return next()

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(user.password, salt)
  user.password = hashedPassword
  next()
})

schema.method('passwordMatch', function passwordMatch(pw: string) {
  return bcrypt.compareSync(pw, this.password)
})

export const User = model<IUser, UserModel>('User', schema)
