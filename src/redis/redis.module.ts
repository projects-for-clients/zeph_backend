import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RedisService } from './redis.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      // store: redisStore({
      //   name: 'redis',
      //   url: process.env.REDIS_URL,
      // }) as any,
      // isGlobal: true,
      // ttl: 99999,

      useFactory: async () => {
        return {
          store: redisStore as any,
          url: process.env.REDIS_URL,
        };
      },
      isGlobal: true,
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisCacheModule {}
