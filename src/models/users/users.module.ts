import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RedisService } from 'src/redis/redis.service';
import { RedisCacheModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisCacheModule],
  controllers: [UsersController],
  providers: [UsersService, RedisService],
})
export class UsersModule {}
