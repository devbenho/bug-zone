import { IProblem, ITag } from "@bugzone/shared/types";
export interface IProblemDAO {
  createProblem(problem: IProblem): Promise<IProblem>;
  getProblem(id: string): Promise<IProblem | undefined | null>;
  getAllProblems(): Promise<IProblem[] | undefined>;
  //Get all problems of @devbenho
  getAllProblems(userId: string): Promise<IProblem[] | undefined>;
  //Get all problems with these tags['web' - 'api' - rest]
  getAllProblems(tags: ITag[]): Promise<IProblem[] | undefined>;
  updateProblem(problem: Partial<IProblem>): Promise<IProblem>;
  deleteProblem(id: string): Promise<IProblem>;
}
