import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redis = new Redis(process.env.REDIS_URL);
  private readonly logger = new Logger(RedisService.name);

  constructor() {
    this.redis.on('connect', () => {
      this.logger.log('Redis connected', RedisService.name);
    });
    this.redis.on('error', (err) => {
      this.logger.log('Redis error', err, RedisService.name);
    });
  }

  //TODOput the local for update
  async set(key: string, value: any): Promise<string> {
    console.log('set', key);

    const res = await this.redis.set(
      key,
      JSON.stringify(value),
      'EX',
      3600 * 24 * 7,
    );

    return res;
  }

  async get(key: string) {
    const cached = await this.redis.get(key);
    return JSON.parse(cached);
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async flushAll(): Promise<void> {
    await this.redis.flushall();
  }
}
