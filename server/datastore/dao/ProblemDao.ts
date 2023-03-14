import { IProblem, ITag } from "@bugzone/shared/types";
export interface IProblemDAO {
  createProblem(problem: IProblem): Promise<IProblem>;
  getProblem(id: string): Promise<IProblem | undefined | null>;
  getAllProblems(
    tags?: ITag[],
    userId?: string
  ): Promise<IProblem[] | undefined>;
  updateProblem(problem: Partial<IProblem>): Promise<IProblem>;
  deleteProblem(id: string): Promise<IProblem>;
}
