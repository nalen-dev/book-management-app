import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './books.service';
import { Book } from 'src/infrastructure/models/books.model';
import { BooksController } from './books.controller';
import { BookBorrowed } from 'src/infrastructure/models/bookBorrowed.model';
import { User } from 'src/infrastructure/models/users.model';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookBorrowed, User])],
  controllers: [BooksController],
  providers: [BookService],
})
export class BooksModule {}
