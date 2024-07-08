import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configureService: ConfigService) => ({
        type: 'postgres',
        host: configureService.getOrThrow('PG_HOST'),
        port: configureService.getOrThrow('PG_PORT'),
        username: configureService.getOrThrow('PG_USERNAME'),
        password: configureService.getOrThrow('PG_PASSWORD'),
        database: configureService.getOrThrow('DB_NAME'),
        autoLoadEntities: true,
        synchronize: configureService.getOrThrow('PG_SYNCHRONIZE'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
