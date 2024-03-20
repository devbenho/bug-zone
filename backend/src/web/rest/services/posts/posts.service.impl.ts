import appDataSource from '../../database/data-source';
import Post from '../../database/entities/post.entity';
import {
  GetAllPostsRequestDto,
  GetPostRequestDto,
  CreatePostRequestDto,
  UpdatePostRequestDto,
  DeletePostRequestDto,
  AddEditorRequestDto,
} from '../../dtos/requests';
import {
  GetAllPostsResponseDto,
  GetPostResponseDto,
  CreatePostResponseDto,
  UpdatePostResponseDto,
  AddEditorResponseDto,
  DeletePostResponseDto,
} from '../../dtos/responses';
import { PostRepository } from '../../repositories/post.repository';
import { IPostService } from './post.service';

export class PostService implements IPostService {
  postRepository = new PostRepository(appDataSource);
  constructor() {}
  async getAllPosts(payload: GetAllPostsRequestDto): Promise<GetAllPostsResponseDto> {
    let { limit, page, userId } = payload;
    if (!limit || !page) {
      limit = 10;
      page = 0;
    }
    let posts;
    if (userId) {
      posts = await this.postRepository.findUserPosts(limit, page, userId);
    }
    posts = await this.postRepository.findAll(limit, page);
    const result: GetAllPostsResponseDto = {
      posts,
    };
    return result;
  }
  async getPostById(payload: GetPostRequestDto): Promise<GetPostResponseDto> {
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
  async updatePost(payload: UpdatePostRequestDto): Promise<UpdatePostResponseDto> {
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
  async addEditor(payload: AddEditorRequestDto): Promise<AddEditorResponseDto> {
    const { editorId, postId } = payload;
    // is post exist
    const post = await this.postRepository.findPostById(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    post.editors.push(editorId);
  }
}
