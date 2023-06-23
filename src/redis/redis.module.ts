import { Module } from '@nestjs/common';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { RedisService } from './redis.service';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      // ttl: 3600 * 24 * 7,
      ttl: 10,
    }),
  ],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: CacheInterceptor,
    },
  ],
})
export class RedisCacheModule {}
