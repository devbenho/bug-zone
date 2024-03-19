export class Chat {
  id: string;
  members: string[]; // userIds
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  constructor(id: string, members: string[], createdAt: Date, updatedAt: Date, deletedAt: Date) {
    this.id = id;
    this.members = members;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
