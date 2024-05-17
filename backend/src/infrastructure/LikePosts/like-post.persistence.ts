import { Nullable } from '@domain/types';
import { UserPersistence } from '@infrastructure/users';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PostPersistence } from '../posts/post.persistence';
import BaseEntity from '../shared/presestance/entities/base.entity';

@Entity()
class LikePostPersistence extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => UserPersistence)
  user: UserPersistence;

  @Column()
  postId: string;

  @ManyToOne(() => PostPersistence)
  post: PostPersistence;

  constructor(
    id: Nullable<string>,
    userId: string,
    user: UserPersistence,
    postId: string,
    post: PostPersistence,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  ) {
    super();
    this.id = id;
    this.userId = userId;
    this.user = user;
    this.postId = postId;
    this.post = post;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}

export default LikePostPersistence;
