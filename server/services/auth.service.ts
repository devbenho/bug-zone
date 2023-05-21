import { IUser, User } from '../models/user.model'
import { JWTObject } from '../types'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'myjwtsecret'

export class AuthService {
  async signToken(payload: JWTObject): Promise<string> {
    return jwt.sign(payload, JWT_SECRET)
  }

  async validateToken(token: string): Promise<JWTObject> {
    return jwt.verify(token, JWT_SECRET) as JWTObject
  }

  async userExists(login: string): Promise<boolean> {
    const user = await User.findOne({
      $or: [{ email: login }, { username: login }],
    })
    return Boolean(user)
  }

  async register(user: IUser): Promise<IUser> {
    try {
      console.log('one')

      console.log('lol')
      if (await this.userExists(user.username || user.email)) {
        throw new Error('User already exists')
      }
      const newUser = new User(user)
      await newUser.save()
      return newUser
    } catch (error) {
      console.log('two')
      throw new Error(`Error registering user: ${error}`)
    }
  }

  async login(data: { login: string; password: string }): Promise<string> {
    const { login, password } = data
    const user = await User.findOne({
      $or: [{ email: login }, { username: login }],
    })
    if (!user) {
      throw new Error('User not found')
    }

    const isPasswordValid = await user.passwordMatch(password)
    if (!isPasswordValid) {
      throw new Error('Invalid password')
    }

    const payload: JWTObject = { userId: user._id.toString() }
    const token = await this.signToken(payload)
    return token
  }
}

export default new AuthService()
