import Post from '../../../database/entities/post.entity';

export type UpdatePostRequestDto = {
  postId: string;
  title?: string;
  content?: string;
};
