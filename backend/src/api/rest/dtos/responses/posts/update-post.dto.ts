import Post from '../../../database/entities/post.entity';
import User from '../../../database/entities/user.entity';

export type UpdatePostResponseDto = {
  post: Post;
  editor: User;
};
