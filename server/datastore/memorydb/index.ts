import {
  IUser,
  IProblem,
  ITag,
  ISolution,
  IReact,
} from "@bugzone/shared/types";
import { uuid } from "uuidv4";
import { IDataStore } from "..";
export class InMemoryDB implements IDataStore {
  private users: IUser[] = [];
  private problems: IProblem[] = [];
  private solutions: ISolution[] = [];
  private reacts: IReact[] = [];
  private tags: ITag[] = [];
  /** UserDAO Implementation */
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
  /** Dashboard Option */
  getAllUsers(): Promise<IUser[]> {
    return Promise.resolve(this.users);
  }
  /** ProblemDAO Implementation */
  getAllProblems(tags?: ITag[], userId?: string): Promise<IProblem[]> {
    let filteredProblems = this.problems;

    if (tags && tags.length > 0) {
      filteredProblems = filteredProblems.filter((problem) => {
        const problemTags = problem.tags || [];
        return tags.some((tag) =>
          problemTags.some((problemTag) => problemTag.id === tag.id)
        );
      });
    }

    if (userId) {
      filteredProblems = filteredProblems.filter(
        (problem) => problem.userId === userId
      );
    }

    return Promise.resolve(filteredProblems);
  }

  async createProblem(problem: IProblem): Promise<IProblem> {
    this.problems.push(problem);
    return problem;
  }
  async getProblem(id: string): Promise<IProblem | null | undefined> {
    return this.problems.find((p) => p.id === id);
  }

  async getProblemsByTags(tags: ITag[]): Promise<IProblem[]> {
    const problemsByTags = this.problems.filter((problem) => {
      if (problem.tags) {
        return tags.every((tag) =>
          problem.tags!.some((problemTag) => problemTag.id === tag.id)
        );
      }
      return false;
    });
    return Promise.resolve(problemsByTags);
  }

  async getProblemsByUser(userId: string): Promise<IProblem[]> {
    const problemsByUser = this.problems.filter(
      (problem) => problem.userId === userId
    );
    return Promise.resolve(problemsByUser);
  }
  async updateProblem(
    problem: Partial<IProblem>,
    userId?: string | undefined
  ): Promise<IProblem> {
    const existingProblem = this.problems.find((p) => p.id === problem.id);
    if (!existingProblem) {
      throw new Error("Problem not found");
    }
    if (userId && userId !== existingProblem.userId) {
      throw new Error("User not authorized to update problem");
    }
    const updatedProblem = Object.assign({}, existingProblem, problem);
    this.problems = this.problems.map((p) =>
      p.id === updatedProblem.id ? updatedProblem : p
    );
    return updatedProblem;
  }
  async deleteProblem(id: string): Promise<IProblem> {
    const index = this.problems.findIndex((problem) => problem.id === id);
    if (index === -1) {
      throw new Error(`Problem with id ${id} not found`);
    }
    const problem = this.problems[index];
    this.problems.splice(index, 1);
    return problem;
  }
  /** SolutionDAO Implementation */
  public async createSolution(solution: ISolution): Promise<void> {
    this.solutions.push(solution);
  }
  public async getSolution(
    id: string | ISolution
  ): Promise<ISolution | null | undefined> {
    const solution = this.solutions.find((s) => s.id === id);
    return solution || null;
  }

  public async getAllSolutions(): Promise<ISolution[]> {
    return this.solutions;
  }

  public async getProblemSolutions(problemId: string): Promise<ISolution[]> {
    const problem = this.problems.find((p) => p.id === problemId);
    if (!problem) {
      return [];
    }

    const problemSolutions = problem.solutions;
    const solutions: ISolution[] = [];

    for (const solutionId of problemSolutions) {
      const solution = await this.getSolution(solutionId);
      if (solution) {
        solutions.push(solution);
      }
    }

    return solutions;
  }

  public async getSolutionsByTags(tags: ITag[]): Promise<ISolution[]> {
    const tagNames = tags.map((t) => t.name);
    return this.solutions.filter((s) => {
      const solutionTagNames = s.tags?.map((t) => t.name) || [];
      return tagNames.every((tagName) => solutionTagNames.includes(tagName));
    });
  }

  public async getSolutionsByUser(userId: string): Promise<ISolution[]> {
    return this.solutions.filter((s) => s.userId === userId);
  }
  public async updateSolution(
    solution: Partial<ISolution>
  ): Promise<ISolution> {
    const index = this.solutions.findIndex((s) => s.id === solution.id);
    if (index === -1) {
      throw new Error(`Solution with ID ${solution.id} not found`);
    }
    const currentSolution = this.solutions[index];
    const updatedSolution = { ...currentSolution, ...solution };
    this.solutions[index] = updatedSolution;
    return updatedSolution;
  }

  public async deleteSolution(id: string): Promise<ISolution> {
    const index = this.solutions.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error(`Solution with ID ${id} not found`);
    }
    const deletedSolution = this.solutions.splice(index, 1)[0];
    return deletedSolution;
  }

  /** ReactDAO Implementation */
  async createReact(react: IReact): Promise<void> {
    // Check if the user has already reacted to the same content
    const existingReact = this.reacts.find(
      (r) =>
        r.userId === react.userId &&
        r.contentType === react.contentType &&
        r.contentId === react.contentId
    );

    if (existingReact) {
      // If the user has already reacted to the content, update the react
      existingReact.reactType = react.reactType;
      existingReact.createdAt = new Date();
    } else {
      // If the user has not yet reacted to the content, add a new react
      this.reacts.push({
        ...react,
        id: uuid(),
        createdAt: new Date(),
      });
    }
  }

  async deleteReact(react: IReact): Promise<void> {
    const index = this.reacts.findIndex(
      (r) =>
        r.userId === react.userId &&
        r.contentType === react.contentType &&
        r.contentId === react.contentId
    );

    if (index !== -1) {
      this.reacts.splice(index, 1);
    }
  }
  getAllReacts(
    contentType: "problem" | "solution",
    contentId: string
  ): Promise<IReact[]> {
    return Promise.resolve(
      this.reacts.filter(
        (r) => r.contentType === contentType && r.contentId === contentId
      )
    );
  }

  countReacts(
    contentType: "problem" | "solution",
    contentId: string
  ): Promise<{ likes: number; dislikes: number }> {
    const reacts = this.reacts.filter(
      (r) => r.contentType === contentType && r.contentId === contentId
    );
    const likes = reacts.filter((r) => r.reactType === "like").length;
    const dislikes = reacts.filter((r) => r.reactType === "dislike").length;
    return Promise.resolve({ likes, dislikes });
  }

  getUserReacts(userId: string): Promise<IReact[]> {
    return Promise.resolve(this.reacts.filter((r) => r.userId === userId));
  }

  isReacted(react: IReact): Promise<boolean> {
    const existingReact = this.reacts.find(
      (r) =>
        r.userId === react.userId &&
        r.contentType === react.contentType &&
        r.contentId === react.contentId
    );
    return Promise.resolve(!!existingReact);
  }

  /** TagDAO Implementation */
  async createTag(tag: ITag): Promise<void> {
    this.tags.push(tag);
  }

  async getAllTags(): Promise<ITag[]> {
    return this.tags;
  }

  async getTag(tag: ITag): Promise<ITag> {
    const foundTag = this.tags.find((t) => t.id === tag.id);
    if (!foundTag) {
      throw new Error("Tag not found");
    }
    return foundTag;
  }

  async getProblemTags(problemId: string): Promise<ITag[]> {
    const problem = this.problems.find((p) => p.id === problemId);
    if (!problem) {
      throw new Error("Problem not found");
    }
    return problem.tags ?? [];
  }

  async getSolutionTags(solutionId: string): Promise<ITag[]> {
    const solution = this.solutions.find((s) => s.id === solutionId);
    if (!solution) {
      throw new Error("Solution not found");
    }
    return solution.tags ?? [];
  }

  async getUserTags(userId: string): Promise<ITag[]> {
    const userTags: ITag[] = [];
    this.problems.forEach((p) => {
      if (p.userId === userId && p.tags) {
        userTags.push(...p.tags);
      }
    });
    this.solutions.forEach((s) => {
      if (s.userId === userId && s.tags) {
        userTags.push(...s.tags);
      }
    });
    return userTags;
  }

  async deleteTag(tag: ITag): Promise<void> {
    this.tags = this.tags.filter((t) => t.id !== tag.id);
    this.problems.forEach((p) => {
      if (p.tags) {
        p.tags = p.tags.filter((t) => t.id !== tag.id);
      }
    });
    this.solutions.forEach((s) => {
      if (s.tags) {
        s.tags = s.tags.filter((t) => t.id !== tag.id);
      }
    });
  }
}
