import BaseEntity from "./base";
import Post from "./post";
import User from "./user";

type LikePost = {
  userId: string;
  user: User;
  postId: string;
  post: Post;
} & BaseEntity;

export default LikePost;
