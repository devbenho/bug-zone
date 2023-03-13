import { IProblem, ITag } from "@bugzone/shared/types";
export interface IProblemDAO {
  create(problem: IProblem): Promise<IProblem>;
  getOne(id: string): Promise<IProblem | undefined | null>;
  getAll(): Promise<IProblem[]>;
  getByTags(tags: ITag[]): Promise<IProblem[]>;
  getByUser(userId: string): Promise<IProblem[]>;
  update(problem: Partial<IProblem>): Promise<IProblem>;
  delete(id: string): Promise<IProblem>;
}
