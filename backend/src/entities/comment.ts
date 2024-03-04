import BaseEntity from "./base";
import LikeComment from "./like-comment";
import Post from "./post";
import Reply from "./reply";
import User from "./user";

type Comment = {
  userId: string;
  user: User;
  postId: string;
  post: Post;
  content: string;
  noLikes: number;
  likes: LikeComment[];
  replies: Reply[];
} & BaseEntity;

export default Comment;
