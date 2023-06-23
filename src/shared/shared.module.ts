import { Module } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [],
  providers: [RedisService],
  exports: [RedisService],
})
export class SharedModule {}
