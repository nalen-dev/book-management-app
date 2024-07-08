import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from './users.model';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  stock: number;

  @ManyToMany(() => User, (user) => user.books)
  users: User[];

  constructor(book: Partial<Book>) {
    Object.assign(this, book);
  }
}
