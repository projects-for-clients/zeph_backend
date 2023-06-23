import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RedisService } from './redis.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      isGlobal: true,
      ttl: 99999,
    }),
  ],
  providers: [
    RedisService,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
  exports: [RedisService],
})
export class RedisCacheModule {}
