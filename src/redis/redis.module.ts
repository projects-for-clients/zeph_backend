import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      // ttl: 3600 * 24 * 7,
      ttl: 10,
    }),
  ],
  providers: [
    RedisService,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: CacheInterceptor,
    },
  ],
  exports: [RedisService],
})
export class RedisCacheModule {}
