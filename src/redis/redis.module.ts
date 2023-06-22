import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-yet';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RedisService } from './redis.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  providers: [
    RedisService,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
  exports: [RedisService],
})
export class RedisCacheModule {}
