import { SignInRequest, SignUpRequest, SignUpResponse } from '@bugzone/shared/apiTypes'
import { db } from '../datastore'
import { IUser } from '@bugzone/shared/types'
import { CustomReqResHandler } from '../types'
import { generateJWT, hashPassword } from '../utils/auth'
import { validateInput } from '../utils/validator'

export const signUpHandler: CustomReqResHandler<SignUpRequest, SignUpResponse> = async (
  req,
  res,
  next
) => {
  const { username, email, password, bio, socialLinks, interests, profilePic } = req.body
  validateInput<SignUpRequest, { username: string; email: string; password: string }>(req.body, {
    username,
    email,
    password,
  })
  const user: IUser = {
    id: crypto.randomUUID(),
    username,
    email,
    password: hashPassword(password),
    bio,
    socialLinks,
    interests,
    profilePic,
    activity: {
      problems: [],
      solutions: [],
      reacts: [],
    },
    createdAt: new Date(),
  }
  // Store the user in DB and return ID
  const newUser = await db.createUser(user)
  // Generate JWT for the user using his ID
  const jwt = generateJWT({ userId: newUser! })
  res.send({ success: true, message: `${username} created`, jwt })
  console.log(user)
  next()
}

export const signInHandler: CustomReqResHandler<SignInRequest, SignUpResponse> = async (
  req,
  res,
  _next
) => {
  const { login, password } = req.body
  if (!login || !password) {
    return res.sendStatus(400)
  }
}
