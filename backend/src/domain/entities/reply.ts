export class Reply {
  id: string;
  commentId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  constructor(
    id: string,
    commentId: string,
    authorId: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
  ) {
    this.id = id;
    this.commentId = commentId;
    this.userId = authorId;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
