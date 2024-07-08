import { Controller, Get } from '@nestjs/common';
import { UserService } from './users.service';
import { UserEntity } from './users.entity';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }
}
