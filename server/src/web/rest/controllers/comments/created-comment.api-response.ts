import { CommentResponseDto } from '@contracts/dtos/comments';
import { Property, Put } from '@tsed/schema';
import { AllPostsApiResponse } from '../posts/all-posts.api-response';
import { publish } from 'rxjs';
import { UserResponseDto } from '@contracts/dtos/users';

class CommentAuthor {
  @Property()
  id: string;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  username: string;

  @Property()
  email: string;

  @Property()
  pictureProfile: string;

  @Property()
  roles: string[];

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    roles: string[],
    pictureProfile: string,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.roles = roles;
    this.pictureProfile = pictureProfile || '';
  }

  public static create(
    id: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    roles: string[],
    pictureProfile?: string,
  ): CommentAuthor {
    return new CommentAuthor(
      id,
      firstName,
      lastName,
      username,
      email,
      roles,
      pictureProfile || '',
    );
  }

  public static fromUserResponse(dto: UserResponseDto): CommentAuthor {
    return new CommentAuthor(
      dto.id,
      dto.firstName,
      dto.lastName,
      dto.username,
      dto.email,
      dto.roles || [],
      dto.pictureProfile || '',
    );
  }
}
class CreatedCommentApiResponse {
  @Property()
  id: string;

  @Property()
  content: string;

  @Property()
  userId: string;

  @Property()
  user: CommentAuthor;

  @Property()
  postId: string;

  @Property()
  post: AllPostsApiResponse;

  @Property()
  createdAt: Date;

  constructor(
    id: string,
    content: string,
    userId: string,
    author: CommentAuthor,
    postId: string,
    createdAt: Date,
  ) {
    this.id = id;
    this.content = content;
    this.userId = userId;
    this.user = author;
    this.postId = postId;
    this.user = author;
    this.createdAt = createdAt;
  }
  public static create(
    id: string,
    content: string,
    userId: string,
    author: CommentAuthor,
    postId: string,
    createdAt: Date,
  ): CreatedCommentApiResponse {
    return new CreatedCommentApiResponse(
      id,
      content,
      userId,
      author,
      postId,
      createdAt,
    );
  }

  public static fromCommentResponseDto(
    response: CommentResponseDto,
  ): CreatedCommentApiResponse {
    return new CreatedCommentApiResponse(
      response.id,
      response.content,
      response.authorId,
      CommentAuthor.fromUserResponse(
        response.author ?? ({} as UserResponseDto),
      ),
      response.postId,
      response.createdAt,
    );
  }
}

export { CreatedCommentApiResponse };
