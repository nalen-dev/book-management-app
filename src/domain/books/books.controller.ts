import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { BookService } from './books.service';
import { BookEntity } from './books.entity';
import { BorrowBookDto } from './dto/borrow-book.dto';

@Controller('/books')
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findBooksAvailable(): Promise<BookEntity[]> {
    return this.bookService.findBooksAvailable();
  }

  @Post(':code')
  async borrowBook(
    @Param('code') code: string,
    @Headers('x-user-code') userCode: string,
  ) {
    if (!userCode) {
      throw new BadRequestException('X-User-Code header is required');
    }
    try {
      const data = await this.bookService.borrowBook(code, userCode);
      return data;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      } else {
      }
    }
  }

  @Delete(':code')
  async returningBook(
    @Param('code') code: string,
    @Headers('x-user-code') userCode: string,
  ) {
    if (!userCode) {
      throw new BadRequestException('X-User-Code header is required');
    }

    try {
      const data = await this.bookService.returningBook(code, userCode);
      return data;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      } else {
      }
    }
  }
}
