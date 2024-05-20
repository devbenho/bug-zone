import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Nullable } from '@domain/shared/types';

Entity();
export default class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Nullable<string>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Nullable<Date>;
}
