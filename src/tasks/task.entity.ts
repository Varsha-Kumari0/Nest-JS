/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
