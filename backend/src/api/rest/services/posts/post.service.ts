import {
  AddEditorRequestDto,
  CreatePostRequestDto,
  DeletePostRequestDto,
  GetAllPostsRequestDto,
  GetPostRequestDto,
  UpdatePostRequestDto,
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
  getPostById(payload: GetPostRequestDto): Promise<GetPostResponseDto>;
  createPost(payload: CreatePostRequestDto): Promise<CreatePostResponseDto>;
  updatePost(payload: UpdatePostRequestDto): Promise<UpdatePostResponseDto>;
  deletePost(payload: DeletePostRequestDto): Promise<DeletePostResponseDto>;
  addEditor(addEditorRequestDto: AddEditorRequestDto): Promise<AddEditorResponseDto>;
}
