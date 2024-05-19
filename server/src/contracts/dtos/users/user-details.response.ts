import { PostResponseDto } from '@dtos/posts';
import { CommentResponseDto } from '@dtos/comments';

class UserDetailsResponse {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public username: string,
    public posts: PostResponseDto[],
    public comments: CommentResponseDto[],
    public pictureProfile: string,
  ) {}
}

export { UserDetailsResponse };
