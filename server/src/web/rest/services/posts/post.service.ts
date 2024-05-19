import {
  AddEditorPostCommand,
  CreatePostRequestDto,
  DeletePostRequestDto,
  GetAllPostsRequestDto,
  GetPostQuery,
  UpdatePostCommand,
} from '../../dtos/requests';
import {
  AddEditorResponseDto,
  CreatePostResponseDto,
  DeletePostResponseDto,
  GetAllPostsResponseDto,
  GetPostResponseDto,
  UpdatePostResponseDto,
} from '../../dtos/responses';

export interface IPostService {
  getAllPosts(payload: GetAllPostsRequestDto): Promise<GetAllPostsResponseDto>;
  getPostById(payload: GetPostQuery): Promise<GetPostResponseDto>;
  createPost(payload: CreatePostRequestDto): Promise<CreatePostResponseDto>;
  updatePost(payload: UpdatePostCommand): Promise<UpdatePostResponseDto>;
  deletePost(payload: DeletePostRequestDto): Promise<DeletePostResponseDto>;
  addEditor(addEditorRequestDto: AddEditorPostCommand): Promise<AddEditorResponseDto>;
}
