import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RedisService } from 'src/redis/redis.service';
import { RequestService } from 'src/services/request.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, RedisService, RequestService],
})
export class UsersModule {}
