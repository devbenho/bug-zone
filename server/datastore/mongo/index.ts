import { IUser, IProblem, ITag, ISolution, IReact } from '@bugzone/shared/types'
import { IDataStore } from '..'

import { MongoClient } from 'mongodb'
export class MongoDB implements IDataStore {
  constructor(readonly uri: string) {}
  // USER
  async createUser(user: IUser): Promise<void> {
    throw new Error('Method not implemented.')
  }
  getUserById(id: string): Promise<IUser | null | undefined> {
    throw new Error('Method not implemented.')
  }
  getUserByUsername(username: string): Promise<IUser | null | undefined> {
    throw new Error('Method not implemented.')
  }
  getUserByEmail(email: string): Promise<IUser | null | undefined> {
    throw new Error('Method not implemented.')
  }
  updateUser(user: Partial<IUser>): Promise<IUser> {
    throw new Error('Method not implemented.')
  }
  deleteUser(id: string): Promise<IUser> {
    throw new Error('Method not implemented.')
  }
  getAllUsers(): Promise<IUser[]> {
    throw new Error('Method not implemented.')
  }
  createProblem(problem: IProblem): Promise<IProblem> {
    throw new Error('Method not implemented.')
  }
  getProblem(id: string): Promise<IProblem | null | undefined> {
    throw new Error('Method not implemented.')
  }
  getAllProblems(
    tags?: ITag[] | undefined,
    userId?: string | undefined
  ): Promise<IProblem[] | undefined> {
    throw new Error('Method not implemented.')
  }
  updateProblem(problem: Partial<IProblem>): Promise<IProblem> {
    throw new Error('Method not implemented.')
  }
  deleteProblem(id: string): Promise<IProblem> {
    throw new Error('Method not implemented.')
  }
  createSolution(solution: ISolution): Promise<void> {
    throw new Error('Method not implemented.')
  }
  getSolution(id: string): Promise<ISolution | null | undefined> {
    throw new Error('Method not implemented.')
  }
  getAllSolutions(): Promise<ISolution[]> {
    throw new Error('Method not implemented.')
  }
  getProblemSolutions(problemId: string): Promise<ISolution[]> {
    throw new Error('Method not implemented.')
  }
  getSolutionsByTags(tags: ITag[]): Promise<ISolution[]> {
    throw new Error('Method not implemented.')
  }
  getSolutionsByUser(userId: string): Promise<ISolution[]> {
    throw new Error('Method not implemented.')
  }
  updateSolution(solution: Partial<ISolution>): Promise<ISolution> {
    throw new Error('Method not implemented.')
  }
  deleteSolution(id: string): Promise<ISolution> {
    throw new Error('Method not implemented.')
  }
  createReact(react: IReact): Promise<void> {
    throw new Error('Method not implemented.')
  }
  deleteReact(react: IReact): Promise<void> {
    throw new Error('Method not implemented.')
  }
  getAllReacts(contentType: 'problem' | 'solution', contentId: string): Promise<IReact[]> {
    throw new Error('Method not implemented.')
  }
  countReacts(
    contentType: 'problem' | 'solution',
    contentId: string
  ): Promise<{ likes: number; dislikes: number }> {
    throw new Error('Method not implemented.')
  }
  getUserReacts(userId: string): Promise<IReact[]> {
    throw new Error('Method not implemented.')
  }
  isReacted(react: IReact): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  createTag(tag: ITag): Promise<void> {
    throw new Error('Method not implemented.')
  }
  getAllTags(): Promise<ITag[]> {
    throw new Error('Method not implemented.')
  }
  getTag(tag: ITag): Promise<ITag> {
    throw new Error('Method not implemented.')
  }
  getProblemTags(problemId: string): Promise<ITag[]> {
    throw new Error('Method not implemented.')
  }
  getSolutionTags(solutionId: string): Promise<ITag[]> {
    throw new Error('Method not implemented.')
  }
  getUserTags(userId: string): Promise<ITag[]> {
    throw new Error('Method not implemented.')
  }
  deleteTag(tag: ITag): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
