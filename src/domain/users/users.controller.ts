import { Controller, Get } from '@nestjs/common';
import { UserService } from './users.service';
import { UserEntity } from './users.entity';
import { ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiTags('User')
  @ApiResponse({ type: UserEntity, status: 200, isArray: true })
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }
}
