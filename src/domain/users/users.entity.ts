import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BookEntity } from '../books/books.entity';
import { Book } from 'src/infrastructure/models/books.model';

export class UserEntity {
  readonly id: number;
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  bannedUntil: Date;

  books: BookEntity[];
}
