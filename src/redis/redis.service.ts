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

  async setCache(key: string, value: any): Promise<string> {
    console.log('setCache', key);

    const set = await this.redis.set(
      key,
      JSON.stringify(value),
      'EX',
      3600 * 24 * 7,
    );

    return set;
  }

  async getCache(key: string) {
    const cached = await this.redis.get(key);
    console.log('getCache', key);
    return cached;
  }

  async delCache(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async flushAll(): Promise<void> {
    await this.redis.flushall();
  }
}
