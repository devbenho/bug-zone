export class LikePost {
  id: string;
  postId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  constructor(
    id: string,
    postId: string,
    authorId: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
  ) {
    this.id = id;
    this.postId = postId;
    this.userId = authorId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
