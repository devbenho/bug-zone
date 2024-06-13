import { Reply } from '@domain/entities';
import { Nullable } from '@domain/shared/types';

interface IReplyRepository {
  saveReply(reply: Reply): Promise<Reply>;
  findReplyById(replyId: string): Promise<Nullable<Reply>>;
  findUserReplies(userId: string): Promise<Reply[]>;
  findAll(limit: number, page: number): Promise<Reply[]>;
  findByContent(content: string): Promise<Nullable<Reply>>;
  findByAuthor(authorId: string): Promise<Nullable<Reply>>;
  findByComment(commentId: string): Promise<Reply[]>;
}

export { IReplyRepository };
