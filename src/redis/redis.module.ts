import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';
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

      useFactory: async () => ({
        store: redisStore as any,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      }),
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
