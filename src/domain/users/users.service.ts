import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { User } from 'src/infrastructure/models/users.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find({
        relations: { books: true },
      });
    } catch (error) {
      return error;
    }
  }
}
