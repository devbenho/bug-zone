import { IPostRepository } from '@/contracts/repositories/post.repository';
import {
  GetAllPostsRequest,
} from '@application/posts/queries/get-all/find-all-posts.query';
import { PostResponseDto } from '@dtos/posts';
import {
  PaginatedList,
} from '@/contracts/models/paginated-list/paginated-list';
import {
  PaginatedListBuilder,
} from '@/contracts/models/paginated-list/paginated-list-builder';
import { UseCase } from '@application/shared';

class FindAllPostsUsecase extends UseCase<GetAllPostsRequest, PaginatedList<PostResponseDto>>{
  constructor(private _postRepository: IPostRepository) {}

  async getAllPosts(payload: GetAllPostsRequest): Promise<PaginatedList<PostResponseDto>> {
    let { userId, page, limit } = payload;


    let posts = (
      !!userId
        ? await this._postRepository.findUserPosts(limit, page, userId)
        : await this._postRepository.findAll(limit, page)
    ).map(PostResponseDto.fromEntity);

    return new PaginatedListBuilder<PostResponseDto>() // TODO: Dynamically mapping from the items to the provided DTO
      .withItems(posts)
      .withPageNumber(page)
      .withTotalCount(posts.length)
      .withPageSize(limit)
      .build();
  }

}