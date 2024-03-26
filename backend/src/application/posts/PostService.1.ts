import appDataSource from '../../database/data-source';
import Post from '../../database/entities/post.entity';
import {
  GetAllPostsRequestDto,
  GetPostQuery,
  CreatePostRequestDto,
  UpdatePostCommand,
  DeletePostRequestDto,
  AddEditorPostCommand
} from '../../web/rest/dtos/requests';
import {
  GetAllPostsResponseDto,
  GetPostResponseDto,
  CreatePostResponseDto,
  UpdatePostResponseDto,
  AddEditorResponseDto,
  DeletePostResponseDto
} from '../../web/rest/dtos/responses';
import { PostRepositoryImpl } from '../../infrastcuture/posts/post.repository.impl';



export class PostService {

  postRepository = new PostRepositoryImpl(appDataSource);

  constructor() { }



  async getPostById(payload: GetPostQuery): Promise<GetPostResponseDto> {
    const { postId } = payload;
    if (!postId) {
      throw new Error('Invalid input');
    }
    const post = (await this.postRepository.findPostById(postId)) as Post | undefined;
    const result: GetPostResponseDto = {
      post,
    };
    return result;
  }
  async createPost(payload: CreatePostRequestDto): Promise<CreatePostResponseDto> {
    const { title, content, authorId } = payload;
    if (!title || !content || !authorId) {
      throw new Error('Invalid input');
    }
    const createdPost = this.postRepository.create({
      title,
      content,
      authorId,
    } as Post);
    const result: CreatePostResponseDto = {
      post: createdPost,
      author: createdPost.user,
    };
    return result;
  }
  async updatePost(payload: UpdatePostCommand): Promise<UpdatePostResponseDto> {
    const { postId, content, title } = payload;

    if (!postId || (!content && !title)) {
      throw new Error('Invalid input');
    }
    const post = this.postRepository.findPostById(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    const query = await this.postRepository.update({ id: postId }, { content, title });
    const updatedPost = (await this.postRepository.findPostById(postId)) as Post;
    const result: UpdatePostResponseDto = {
      post: updatedPost,
      editor: updatedPost.user,
    };
    return result;
  }
  async deletePost(payload: DeletePostRequestDto): Promise<DeletePostResponseDto> {
    const { postId } = payload;
    const query = await this.postRepository.findPostById(postId);
    if (!query) {
      throw new Error('post not found');
    }
    const deleteResult = (await this.postRepository.softDelete({ id: postId })).raw;
    return deleteResult;
  }
  async addEditor(payload: AddEditorPostCommand): Promise<AddEditorResponseDto> {
    const { editorId, postId } = payload;
    // is post exist
    const post = await this.postRepository.findPostById(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    post.editors.push(editorId);
  }
}
