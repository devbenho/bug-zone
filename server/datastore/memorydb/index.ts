import {
  IUser,
  IProblem,
  ITag,
  ISolution,
  IReact,
} from "@bugzone/shared/types";
import { IDataStore } from "..";
export class InMemoryDB implements IDataStore {
  private users: IUser[] = [];
  private problems: IProblem[] = [];
  private solutions: ISolution[] = [];
  private reacts: IReact[] = [];

  async createUser(user: IUser): Promise<void> {
    this.users.push(user);
  }
  async getUserById(id: string): Promise<IUser | null | undefined> {
    return this.users.find((u) => u.id === id);
  }
  async getUserByUsername(username: string): Promise<IUser | null | undefined> {
    return this.users.find((u) => u.username === username);
  }
  async getUserByEmail(email: string): Promise<IUser | null | undefined> {
    return this.users.find((u) => u.email === email);
  }
  async updateUser(user: Partial<IUser>): Promise<IUser> {
    const foundUser = this.users.find((u) => u.id === user.id);
    if (foundUser) {
      Object.assign(foundUser, user);
      return foundUser;
    } else {
      throw new Error(`User with id ${user.id} not found`);
    }
  }
  async deleteUser(id: string): Promise<IUser> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index < 0) {
      throw new Error("User not found");
    }
    const deletedUser = this.users.splice(index, 1)[0];
    return Promise.resolve(deletedUser);
  }

  getAllUsers(): Promise<IUser[]> {
    return Promise.resolve(this.users);
  }
  async createProblem(problem: IProblem): Promise<IProblem> {
    this.problems.push(problem);
    return problem;
  }
  async getProblem(id: string): Promise<IProblem | null | undefined> {
    return this.problems.find((p) => p.id === id);
  }
  async getAllProblems(): Promise<IProblem[]> {
    console.log(this.problems);

    return this.problems;
  }
  getProblemsByTags(tags: ITag[]): Promise<IProblem[]> {
    throw new Error("Method not implemented.");
  }
  getProblemsByUser(userId: string): Promise<IProblem[]> {
    throw new Error("Method not implemented.");
  }
  updateProblem(
    problem: Partial<IProblem>,
    userId?: string | undefined
  ): Promise<IProblem> {
    throw new Error("Method not implemented.");
  }
  deleteProblem(id: string, userId?: string | undefined): Promise<IProblem> {
    throw new Error("Method not implemented.");
  }
}
