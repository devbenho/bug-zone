import { Column, Entity } from "typeorm";
import BaseEntity from "./base.entity";

@Entity()
export class Friendship extends BaseEntity {
  @Column()
  userId: string;

  @Column()
  friendId: string;

  @Column()
  type: "pending" | "accepted" | "rejected" | "blocked";
}
