export class Message {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  constructor(
    id: string,
    userId: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}

export class ChatMessage extends Message {
  roomId: string;
  constructor(
    id: string,
    userId: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
    roomId: string
  ) {
    super(id, userId, content, createdAt, updatedAt, deletedAt);
    this.roomId = roomId;
  }
}
