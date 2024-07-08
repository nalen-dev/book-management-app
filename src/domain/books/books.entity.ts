import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BookEntity {
  readonly id: number;
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  @IsNotEmpty()
  stock: number;
}
