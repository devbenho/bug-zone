export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  profilePic?: string;
  contributions?: number;
  rate?: number;
  createdAt: Date;
  bio?: string;
  interests?: ITag[];
  socialLinks?: string[];
  activity: {
    problems: IProblem[];
    solutions: ISolution[];
    reacts: IReact[];
  };
}

export interface IContent {
  id: string;
  userId: string;
  content: string;
  liked?: boolean;
  disliked?: boolean;
  likes: number;
  dislikes: number;
  type: "created" | "shared";
  tags?: ITag[];
  createdAt: Date;
}

export interface IProblem extends IContent {
  title: string;
}
export interface ISolution extends IContent {
  problemId: string;
}

export interface IReact {
  id: string;
  userId: string;
  reactType: "like" | "dislike";
  contentType: "problem" | "solution";
  contentId: string;
  createdAt: Date;
}

export interface ITag {
  id: string;
  name: string;
}
