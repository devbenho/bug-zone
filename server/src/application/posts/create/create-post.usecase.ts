import { BaseUseCase } from '@application/shared';
import { CreatePostRequestDto } from '@contracts/dtos/posts/create/create-post.request';
import { CreatePostResponseDto } from '@contracts/dtos/posts/create/create-post.response';
import { Post } from '@domain/entities';
import { IPostRepository } from '@domain/repositories/post.repository';

class CreatePostUseCase extends BaseUseCase<
  CreatePostRequestDto,
  CreatePostResponseDto
> {
  protected async performOperation(
    request: CreatePostRequestDto,
  ): Promise<CreatePostResponseDto> {
    const post = Post.create(
      request.title,
      request.content,
      request.authorId,
      request.author,
    );
    const createdPost = await this._postRepository.createPost(post);
    const result: CreatePostResponseDto = {
      author: createdPost.author,
      post: createdPost,
    };
    return result;
  }
  constructor(private _postRepository: IPostRepository) {
    super();
  }
}

export { CreatePostUseCase };
