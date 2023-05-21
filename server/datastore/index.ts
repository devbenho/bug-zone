import mongoose from 'mongoose'

export const dbConnect = async (uri: string) => {
  if (!uri) process.exit(0)
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(uri)
    console.log('SUCESSFULLY CONNECTED')
  } catch (e) {
    console.log('MONGO_DB FAILED CONNECTION')
    process.exit(0)
  }
}
