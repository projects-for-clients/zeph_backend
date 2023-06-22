import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import redisConfig from './redis.config';
import * as redisStore from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.register({
        
        store: {
            create: () => redisStore,
            set(key, value, options) {
                console.log('set', key, value, options)
            },
            get(key) {
                console.log('get', key)
            },
            options: {
                url: 'redis://localhost:6379',
                
            },
        },
      }
  ],
})
export class RedisCacheModule {}
