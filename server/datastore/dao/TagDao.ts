import { ITag } from "@bugzone/shared/types";

export interface ITagDAO {
  createTag(tag: ITag): Promise<void>;
  getAllTags(): Promise<ITag[]>;
  getTag(tag: ITag): Promise<ITag>;
  getProblemTags(problemId: string): Promise<ITag[]>;
  getSolutionTags(solutionId: string): Promise<ITag[]>;
  getUserTags(userId: string): Promise<ITag[]>;
  deleteTag(tag: ITag): Promise<void>;
}
