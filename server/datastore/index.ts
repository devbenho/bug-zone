import { IUserDAO } from "./dao/UserDao";
import { IProblemDAO } from "./dao/ProblemDao";
import { ISolutionDAO } from "./dao/SolutionDao";
import { IReactDAO } from "./dao/ReactDao";
import { InMemoryDB } from "./memorydb";
import { ITagDAO } from "./dao/TagDao";
export interface IDataStore
  extends IUserDAO,
    IProblemDAO,
    ISolutionDAO,
    IReactDAO,
    ITagDAO {}

export const db = new InMemoryDB();
