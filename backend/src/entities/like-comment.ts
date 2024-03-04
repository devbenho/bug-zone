import BaseEntity from "./base";
import Comment from "./comment";
import User from "./user";

type LikeComment = {
  userId: string;
  user: User;
  commentId: string;
  comment: Comment;
} & BaseEntity;

export default LikeComment;
