import { Router } from 'express'
import { login, register } from '../handlers/auth.handler'

export const router = Router()
router.route('/register').post(register)
router.route('/login').post(login)
