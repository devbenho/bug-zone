import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import BaseEntity from '../shared/persistence/entities/base.entity';
import LikePostPersistence from '../LikePosts/like-post.persistence';
import CommentPersistence from '../comments/comment.persistence';
import { Nullable } from '@domain/types';
import { UserPersistence } from '@infrastructure/users';

@Entity()
class PostPersistence extends BaseEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  authorId: string;

  @ManyToOne(() => UserPersistence, user => user.posts)
  author: UserPersistence;

  @OneToMany(() => CommentPersistence, comment => comment.post)
  comments: CommentPersistence[];

  @OneToMany(() => LikePostPersistence, likePost => likePost.post)
  likes: LikePostPersistence[];

  constructor(
    id: Nullable<string>,
    title: string,
    content: string,
    authorId: string,
    author: UserPersistence,
    comments: CommentPersistence[],
    likes: LikePostPersistence[],
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  ) {
    super();
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.author = author;
    this.comments = comments;
    this.likes = likes;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}

export { PostPersistence };
