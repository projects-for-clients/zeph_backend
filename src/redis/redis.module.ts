import { CacheModule, Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  providers: [RedisService],
  imports: [CacheModule.register({})],
})
@Global()
export class RedisModule {}
