import { Entity, Column, OneToMany, OneToOne, ManyToOne } from "typeorm";
import BaseEntity from "./base.entity";
import LikePost from "./like-post.entity";
import Comment from "./comment.entity";
import User from "./user.entity";

@Entity()
class Post extends BaseEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  authorId: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => LikePost, (likePost) => likePost.post)
  likes: LikePost[];
}

export default Post;
