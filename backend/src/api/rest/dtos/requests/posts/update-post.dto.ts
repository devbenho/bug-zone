import Post from '../../../database/entities/post.entity';

export type UpdatePostRequestDto = {
  postId: string;
  post: Pick<Post, 'title' | 'content'>;
};
