import BaseEntity from "./base";
import Comment from "./comment";
import LikeReply from "./like-reply";
import User from "./user";

type Reply = {
  userId: string;
  user: User;
  commentId: string;
  comment: Comment;
  content: string;
  likes: LikeReply[];
} & BaseEntity;

export default Reply;
