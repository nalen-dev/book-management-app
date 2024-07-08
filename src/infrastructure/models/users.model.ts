import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Book } from './books.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ name: 'banned_until', nullable: true })
  bannedUntil: Date;

  @ManyToMany(() => Book, (book) => book.users)
  @JoinTable({
    name: 'book_borrowed',
    joinColumn: { name: 'user_code', referencedColumnName: 'code' },
    inverseJoinColumn: { name: 'book_code', referencedColumnName: 'code' },
  })
  books: Book[];

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
