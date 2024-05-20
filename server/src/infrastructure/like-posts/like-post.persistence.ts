import { UserPersistence } from '@infrastructure/users';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PostPersistence } from '../posts/post.persistence';
import BaseEntity from '@infrastructure/shared/persistence/entities/base.persistence';

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
    userId: string,
    user: UserPersistence,
    postId: string,
    post: PostPersistence,
  ) {
    super();
    this.userId = userId;
    this.user = user;
    this.postId = postId;
    this.post = post;
  }
}

export default LikePostPersistence;
