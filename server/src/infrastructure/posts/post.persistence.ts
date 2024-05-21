import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import CommentPersistence from '../comments/comment.persistence';
import { UserPersistence } from '@infrastructure/users';
import { LikePostPersistence } from '@infrastructure/like-posts/';
import BaseEntity from '@infrastructure/shared/persistence/entities/base.persistence';

@Entity()
class PostPersistence extends BaseEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  authorId: string;

  @ManyToOne(() => UserPersistence, user => user.posts, { lazy: true })
  author: UserPersistence;

  @OneToMany(() => CommentPersistence, comment => comment.post, { lazy: true })
  comments: CommentPersistence[];

  @OneToMany(() => LikePostPersistence, likePost => likePost.post, {
    lazy: true,
  })
  likes: LikePostPersistence[];

  constructor(title: string, content: string, authorId: string) {
    super();
    this.title = title;
    this.content = content;
    this.authorId = authorId;
  }
}

export { PostPersistence };
