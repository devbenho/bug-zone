import { ISolution, ITag } from "@bugzone/shared/types";

export interface ISolutionDAO {
  createSolution(solution: ISolution): Promise<void>;
  getSolution(id: string): Promise<ISolution | undefined | null>;
  getAllSolutions(): Promise<ISolution[]>;
  getProblemSolutions(problemId: string): Promise<ISolution[]>;
  getSolutionsByTags(tags: ITag[]): Promise<ISolution[]>;
  getSolutionsByUser(userId: string): Promise<ISolution[]>;
  updateSolution(solution: Partial<ISolution>): Promise<ISolution>;
  deleteSolution(id: string): Promise<ISolution>;
}
