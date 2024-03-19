export class LikeComment {
  id: string;
  commentId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  constructor(
    id: string,
    commentId: string,
    authorId: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
  ) {
    this.id = id;
    this.commentId = commentId;
    this.userId = authorId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
