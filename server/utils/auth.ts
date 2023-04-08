import { JWTObject } from '../types'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const hashPassword = (password: string) => {
  const hashed = bcrypt.hashSync(password, 10)
  return hashed
}

export const generateJWT = (payload: JWTObject) => {
  return jwt.sign(payload, getSecret(), { expiresIn: '15d' })
}

export const getSecret = () => {
  if (!process.env.JWT_SECRET) throw Error('JWT_SECRET MISSING')
  return process.env.JWT_SECRET
}
