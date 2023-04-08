import { ObjectId } from "../server/node_modules/mongodb"

export interface IUser {
  _id: ObjectId
  username: string
  email: string
  password: string
  profilePic?: string
  contributions?: number
  rate?: number
  bio?: string
  interests?: ITag[]
  socialLinks?: string[]
  activity: {
    problems: IProblem[]
    solutions: ISolution[]
    reacts: IReact[]
  }
  createdAt: Date
}

export interface IContent {
  userId: string
  content: string
  liked?: boolean
  disliked?: boolean
  likes?: number
  dislikes?: number
  type: 'created' | 'shared'
  tags?: ITag[]
  createdAt: Date
}

export interface IProblem extends IContent {
  title: string
  solutions: string[] | ISolution[]
}
export interface ISolution extends IContent {
  problemId: string
}

export interface IReact {
  userId: string
  reactType: 'like' | 'dislike'
  contentType: 'problem' | 'solution'
  contentId: string
  createdAt: Date
}

export interface ITag {
  name: string
}
