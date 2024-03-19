export class LikeReply {
  id: string;
  replyId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  constructor(
    id: string,
    replyId: string,
    authorId: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
  ) {
    this.id = id;
    this.replyId = replyId;
    this.userId = authorId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
