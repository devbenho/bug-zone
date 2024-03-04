import BaseEntity from "./base";
import Comment from "./comment";
import LikePost from "./like-post";

type Post = {
  title: string;
  content: string;
  comments: Comment[];
  likes: LikePost[];
} & BaseEntity;

export default Post;
