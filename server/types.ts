// Custom Types

import { RequestHandler } from 'express'

export type CustomReqResHandler<Req, Res> = RequestHandler<string, Partial<Res>, Partial<Req>, any>
export interface JWTObject {
  userId: string
}
export class CustomError {
  message!: string
  status!: number
  additionalInfo!: any

  constructor(message: string, status: number = 500, additionalInfo: any = {}) {
    this.message = message
    this.status = status
    this.additionalInfo = additionalInfo
  }
}
