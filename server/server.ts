import { dbConnect } from './datastore'
import dotenv from 'dotenv'
import { app } from './app'
;(async () => {
  dotenv.config()
  const PORT = process.env.PORT || 4050
  /* DB Connection */
  await dbConnect(process.env.DB_URL!)
  /* Server Listening */
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
  })
})()
