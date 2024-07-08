import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/infrastructure/models/books.model';
import { MoreThan, Repository } from 'typeorm';
import { BookEntity } from './books.entity';
import { BookBorrowed } from 'src/infrastructure/models/bookBorrowed.model';
import { User } from 'src/infrastructure/models/users.model';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(BookBorrowed)
    private bookBorrowRepository: Repository<BookBorrowed>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findBooksAvailable(): Promise<BookEntity[]> {
    try {
      return await this.bookRepository.find({ where: { stock: MoreThan(0) } });
    } catch (error) {
      return error;
    }
  }

  async borrowBook(bookCode: string, userCode: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { code: userCode },
        relations: { books: true },
      });

      if (!user) {
        throw new NotFoundException('user not found');
      }

      if (user.books.length >= 2) {
        throw new ForbiddenException(
          'User has reach maximum amount of borrowing book at the same time.',
        );
      }

      const now = new Date();
      if (user.bannedUntil && user.bannedUntil > now) {
        throw new ForbiddenException(
          'User is currently banned from borrowing books',
        );
      }

      if (user.bannedUntil) {
        user.bannedUntil = null;
        await this.userRepository.save(user);
      }

      const book = await this.bookRepository.findOne({
        where: { code: bookCode },
      });

      if (!book) {
        throw new NotFoundException('book not found');
      }

      if (book.stock == 0) {
        throw new BadRequestException('book is not available');
      }

      const bookBorrowed = new BookBorrowed({
        bookCode: bookCode,
        userCode: userCode,
      });

      await this.bookBorrowRepository.insert(bookBorrowed);

      book.stock -= 1;
      await this.bookRepository.save(book);
    } catch (error) {
      throw error;
    }
    return { message: 'success borrowing book' };
  }

  async returningBook(bookCode: string, userCode: string) {
    try {
      const bookBorrowed = await this.bookBorrowRepository.findOne({
        where: {
          books: { code: bookCode },
          users: { code: userCode },
        },
        relations: ['books', 'users'],
      });

      if (bookBorrowed == null) {
        throw new NotFoundException();
      }

      await this.bookBorrowRepository.remove(bookBorrowed);

      const book = bookBorrowed.books;
      book.stock += 1;
      await this.bookRepository.save(book);

      const now = new Date();
      const dateBorrowed = new Date(bookBorrowed.dateBorrow);
      const oneWeekAfter = new Date(dateBorrowed);
      oneWeekAfter.setDate(dateBorrowed.getDate() + 7);

      if (now < oneWeekAfter) {
        return { message: 'success returning book' };
      }

      const user = bookBorrowed.users;
      user.bannedUntil = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
      await this.userRepository.save(user);
      return {
        message:
          'success returning book, but the user is banned for 3 days due to late return',
      };
    } catch (error) {
      throw error;
    }
  }
}
