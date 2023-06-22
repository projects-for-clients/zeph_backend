import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RedisService } from 'src/redis/redis.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, RedisService],
})
export class UsersModule {}
