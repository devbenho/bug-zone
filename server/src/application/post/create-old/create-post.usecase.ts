// import { BaseUseCase } from '@application/shared';
// import { CreatePostResponseDto } from '@contracts/dtos/posts/create/create-post.response';
// import { Post } from '@domain/entities';
// import { IPostRepository } from '@domain/repositories/post.repository';
// import { CreatePostRequest } from '../create/create-post.request';

// class CreatePostUseCase extends BaseUseCase<
//   CreatePostRequest,
//   CreatePostResponseDto
// > {
//   protected async performOperation(
//     request: CreatePostRequest,
//   ): Promise<CreatePostResponseDto> {
//     const post = Post.create(
//       request.title,
//       request.content,
//       request.authorId,
//       request.author,
//     );
//     const createdPost = await this._postRepository.createPost(post);
//     const result: CreatePostResponseDto = {
//       author: createdPost.author,
//       post: createdPost,
//     };
//     return result;
//   }
//   constructor(private _postRepository: IPostRepository) {
//     super();
//   }
// }

// export { CreatePostUseCase };
