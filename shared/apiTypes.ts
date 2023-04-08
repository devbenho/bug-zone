import { IUser } from './types'
export interface generalResponse {
  success: boolean
  message: string
  error?: string
}
//USER APIs
export type SignUpRequest = Pick<
  IUser,
  | 'id'
  | 'email'
  | 'username'
  | 'password'
  | 'bio'
  | 'profilePic'
  | 'interests'
  | 'socialLinks'
  | 'createdAt'
>

export type SignUpResponse =
  | {
      jwt: string
    }
  | generalResponse

export type SignInRequest = {
  login: string // username or email
  password: string
}
export type SignInResponse =
  | {
      user: Pick<IUser, 'username' | 'email' | 'rate' | 'contributions' | 'activity'>
      jwt: string
    }
  | generalResponse
