import { Entity, Column, ManyToOne } from "typeorm";
import BaseEntity from "./base.entity";
import User from "./user.entity";
import Post from "./post.entity";

@Entity()
class LikePost extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  postId: string;

  @ManyToOne(() => Post)
  post: Post;
}

export default LikePost;
