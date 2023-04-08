import express from 'express'
import morgan from 'morgan'

export const app = express()

// Middlewares
app.use(express.json())
app.use(morgan('dev'))

// Routers
app.use('/healthZ', (_req, res, next) => {
  res.send(`It Works 🤯`)
  next()
})
