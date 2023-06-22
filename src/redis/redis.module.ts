import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
  providers: [RedisService],
  imports: [RedisService],
})
@Global()
export class RedisModule {}
