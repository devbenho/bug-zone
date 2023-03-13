import { IReact } from "@bugzone/shared/types";

export interface IReactDAO {
  createReact(react: IReact): Promise<void>;
  deleteReact(react: IReact): Promise<void>;
  getAllReacts(
    contentType: "problem" | "solution",
    contentId: string
  ): Promise<IReact[]>;
  countReacts(
    contentType: "problem" | "solution",
    contentId: string
  ): Promise<{ likes: number; dislikes: number }>;
  getUserReacts(userId: string): Promise<IReact[]>;
  isReacted(react: IReact): Promise<boolean>;
}
