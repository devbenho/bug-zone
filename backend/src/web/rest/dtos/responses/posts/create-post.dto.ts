import Post from '../../../database/entities/post.entity';
import User from '../../../database/entities/user.entity';

export type CreatePostResponseDto = {
  post: Post;
  author: User;
};
