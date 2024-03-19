import Post from '../../../database/entities/post.entity';

export type AddEditorResponseDto = {
  post: Post;
  editors: string[];
};
