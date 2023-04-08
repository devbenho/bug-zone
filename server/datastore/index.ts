import { IUserDAO } from './dao/UserDao'
import { IProblemDAO } from './dao/ProblemDao'
import { ISolutionDAO } from './dao/SolutionDao'
import { IReactDAO } from './dao/ReactDao'
import { InMemoryDB } from './memorydb'
import { ITagDAO } from './dao/TagDao'
import { MongoClient } from 'mongodb'
export interface IDataStore extends IUserDAO, IProblemDAO, ISolutionDAO, IReactDAO, ITagDAO {}

export let db: IDataStore

export const dbConnect = async () => {
  const uri = process.env.DB_URL
  if (!uri) {
    db = new InMemoryDB()
    console.log(`DB_URL is not provided`)
    console.log('I cannot connect to MongoDB ... I connected to InMemoryDB instead 😥')
    return
  }
  const client = new MongoClient(uri)
  console.log('DB Connecting 🤔')
  if (process.env.DB_TYPE === 'mongodb') {
    try {
      // Connect to the MongoDB cluster
      await client.connect()
      console.log('Connected to MongoDB ✅')
    } catch (e) {
      console.error(e)
      console.log('Failed Connection to MongoDB ❌')
      db = new InMemoryDB()
      console.log('I cannot connect to MongoDB ... I connected to InMemoryDB instead 😥')
    } finally {
      // Close the client
      await client.close()
    }
  } else if (process.env.DB_TYPE === 'memory') {
    db = new InMemoryDB()
    console.log('Connected to InMemoryDB ✅')
  }
}
