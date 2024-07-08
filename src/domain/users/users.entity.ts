import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BookEntity } from '../books/books.entity';
import { Book } from 'src/infrastructure/models/books.model';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  readonly id: number;

  @ApiProperty()
  readonly code: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsDate()
  bannedUntil: Date;

  @ApiProperty()
  books: BookEntity[];
}
