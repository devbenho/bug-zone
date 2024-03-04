import exp from "constants";
import BaseEntity from "./base";
import Reply from "./reply";
import User from "./user";

type LikeReply = {
  userId: string;
  user: User;
  replyId: string;
  reply: Reply;
} & BaseEntity;

export default LikeReply;
