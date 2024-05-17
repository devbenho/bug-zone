import { Post, User } from '@domain/entities';

class CreatePostResponseDto {
  post: Post;
  author: User;
}

export { CreatePostResponseDto };
