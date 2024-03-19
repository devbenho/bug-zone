export class Notification {
  id: string;
  userId: string;
  postId: string;
  commentId: string;
  replyId: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  constructor(
    id: string,
    userId: string,
    postId: string,
    commentId: string,
    replyId: string,
    type: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
    this.commentId = commentId;
    this.replyId = replyId;
    this.type = type;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
