import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RedisService } from './redis.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // CacheModule.registerAsync({
    //   useFactory: async (configService: ConfigService) => ({
    //     store: await redisStore({
    //       url: process.env.REDIS_URL,
    //       ttl: 60 * 1000 * 3600,
    //     }),
    //   }),

    //   isGlobal: true,
    // }),

    CacheModule.register({
      useFactory: async () => {
        return {
          store: redisStore as any,
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
        };
      },
      isGlobal: true,
    }),
  ],
  providers: [
    RedisService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [RedisService],
})
export class RedisCacheModule {}
