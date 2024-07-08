import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Headers,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { BookService } from './books.service';
import { BookEntity } from './books.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Book')
@Controller('/books')
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiResponse({ type: BookEntity, status: 200, isArray: true })
  findBooksAvailable(): Promise<BookEntity[]> {
    return this.bookService.findBooksAvailable();
  }

  @Post(':code')
  @ApiResponse({ status: 201, example: { message: 'success borrowing book' } })
  @ApiResponse({
    description:
      'Book code is invalid or the book is already borrowed by someone else',
    status: 400,
    example: {
      message: 'book is not available',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    description: 'Missing header',
    status: 403,
    example: {
      message: 'X-User-Code header is required',
      error: 'Forbidden',
      statusCode: 403,
    },
  })
  async borrowBook(
    @Param('code') code: string,
    @Headers('x-user-code') userCode: string,
  ) {
    if (!userCode) {
      throw new ForbiddenException('X-User-Code header is required');
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
  @ApiResponse({ status: 200, example: { message: 'string' } })
  @ApiResponse({
    description: 'Data inserted not found',
    status: 404,
    example: {
      message: 'Not Found',
      statusCode: 404,
    },
  })
  @ApiResponse({
    description: 'Missing Header',
    status: 403,
    example: {
      message: 'X-User-Code header is required',
      error: 'Forbidden',
      statusCode: 403,
    },
  })
  async returningBook(
    @Param('code') code: string,
    @Headers('x-user-code') userCode: string,
  ) {
    if (!userCode) {
      throw new ForbiddenException('X-User-Code header is required');
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
