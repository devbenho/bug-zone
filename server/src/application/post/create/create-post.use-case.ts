import { BaseUseCase, UseCase } from '@application/shared';
import { PostRepository } from '@domain/entities/posts/post.repository';
import { PostDetailsResponseDto } from '@contracts/dtos/posts/post-details.response';
import { CreatePostRequest } from './create-post.request';
import { Post } from '@domain/entities';

@UseCase()
class CreatePostUseCase extends BaseUseCase<
  CreatePostRequest,
  PostDetailsResponseDto
> {
  private readonly _postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    super();
    this._postRepository = postRepository;
  }

  public async performOperation(
    request: CreatePostRequest,
  ): Promise<PostDetailsResponseDto> {
    const post = Post.create(
      null,
      request.title,
      request.content,
      request.authorId,
      null,
      [],
      [],
      request.status,
      new Date(),
      null,
      null,
    );
    const createdPost = await this._postRepository.createPost(post);
    if (createdPost) {
      return PostDetailsResponseDto.fromEntity(createdPost);
    }
    return {} as PostDetailsResponseDto;
  }
}

export { CreatePostUseCase };
