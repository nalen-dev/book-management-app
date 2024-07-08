import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Book } from './books.model';
import { User } from './users.model';

@Entity('book_borrowed')
export class BookBorrowed {
  @PrimaryColumn({ name: 'book_code' })
  bookCode: string;

  @PrimaryColumn({ name: 'user_code' })
  userCode: string;

  @ManyToOne(() => User, (user) => user.books, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_code', referencedColumnName: 'code' }])
  users: User;

  @ManyToOne(() => Book, (book) => book.users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'book_code', referencedColumnName: 'code' }])
  books: Book;

  @Column({
    name: 'date_borrow',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateBorrow: Date;

  constructor(book: Partial<BookBorrowed>) {
    Object.assign(this, book);
  }
}
