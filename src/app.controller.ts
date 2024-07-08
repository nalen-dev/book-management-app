import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from 'src/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Health Check')
  @ApiResponse({
    status: 200,
    description: 'check app state',
    example: {
      status: 'ok',
      time: '2024-07-08T17:38:23.457Z',
    },
  })
  @Get('/health-check')
  async healthCheck() {
    return await this.appService.healthCheck();
  }
}
