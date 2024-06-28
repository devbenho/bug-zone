import { Nullable } from '@domain/shared';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserPersistence } from '@infrastructure/users/';
import { Default } from '@tsed/schema';

@Entity({ name: 'chats' })
class ChatPersistence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  @Default(Date.now())
  createdAt: Date;

  @UpdateDateColumn()
  @Default(Date.now())
  updatedAt: Nullable<Date>;

  @DeleteDateColumn()
  deletedAt: Nullable<Date>;

  @Column()
  name: string;

  @Column()
  ownerId: string;

  @ManyToOne(() => UserPersistence, user => user.chats, { lazy: true })
  owner: Promise<UserPersistence>;

  @ManyToMany(() => UserPersistence, user => user.chats, { lazy: true })
  participants: Promise<UserPersistence[]>;
}

export { ChatPersistence };
