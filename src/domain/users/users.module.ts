import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookBorrowed } from 'src/infrastructure/models/bookBorrowed.model';
import { User } from 'src/infrastructure/models/users.model';
import { UserService } from './users.service';
import { UserController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, BookBorrowed])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
