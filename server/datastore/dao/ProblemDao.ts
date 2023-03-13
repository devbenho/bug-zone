import { IProblem, ITag } from "@bugzone/shared/types";
export interface IProblemDAO {
  createProblem(problem: IProblem): Promise<IProblem>;
  getProblem(id: string): Promise<IProblem | undefined | null>;
  getAllProblems(): Promise<IProblem[] | undefined>;
  getProblemsByTags(tags: ITag[]): Promise<IProblem[]>;
  getProblemsByUser(userId: string): Promise<IProblem[]>;
  updateProblem(problem: Partial<IProblem>): Promise<IProblem>;
  deleteProblem(id: string): Promise<IProblem>;
}
