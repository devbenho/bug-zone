import Post from '../../../database/entities/post.entity';

export type GetAllPostsResponseDto = {
  posts: Post[];
};
