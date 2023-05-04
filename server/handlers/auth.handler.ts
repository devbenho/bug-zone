import { Request, Response, NextFunction } from 'express'
import { User } from '../models/user.model'
import { AuthService } from '../services/auth.service'

export const register = async (req: Request, res: Response, _next: NextFunction) => {
  // check fields
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    return res.status(400).send({
      success: false,
      messsage: 'All fields are required',
    })
  }
  // is user exist
  const user = await User.findOne({ username })
  if (user) {
    return res.status(403).send({
      success: false,
      message: 'This user is already exist',
    })
  }
  // create user
  const newUser = await User.create({ username, email, password })
  //   Generate Token
  const jwt: string = await new AuthService().signToken({ userId: newUser._id.toHexString() })
  // response
  return res.status(200).send({
    success: true,
    jwt,
  })
}

export const login = async (req: Request, res: Response, _next: NextFunction) => {
  // check fields
  const { login, password } = req.body
  if (!login || !password) {
    return res.status(400).send({
      success: false,
      messsage: 'All fields are required',
    })
  }
  // lw user msh mwgood
  const user = await User.findOne({ $or: [{ username: login }, { email: login }] })
  if (!user || !user.passwordMatch(password)) {
    return res.status(403).send({
      success: false,
      message: 'Invalid Data',
    })
  }
  //   Generate Token
  const token = await new AuthService().signToken({ userId: user._id.toHexString() })

  res.cookie('jwt', token, { httpOnly: true, sameSite: true })

  return res.status(200).json({ success: true, token })
}
