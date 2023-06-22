import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-yet';
import { RedisService } from './redis.service';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisCacheModule {}
