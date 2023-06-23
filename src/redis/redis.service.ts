import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redis = new Redis(process.env.REDIS_URL);

  constructor() {
    this.redis.on('connect', () => {
      console.log('Redis connected');
    });
    this.redis.on('error', (err) => {
      console.log('Redis error', err);
    });
  }

  async setCache(key: string, value: any): Promise<string> {
    console.log('setCache', key);

    const set = await this.redis.set(key, value);
    return set;
  }

  async getCache(key: string) {
    const cached = await this.redis.get(key);
    console.log('getCache', key);
    //return cached;
  }

  async delCache(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async resetCache(): Promise<void> {
    await this.redis.reset();
  }
}
