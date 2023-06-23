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

  async setCache(key: string, value: any): Promise<void> {
    console.log('setCache', key);

    // return await this.cache.set(key, value, 7000);
  }

  async getCache(key: string) {
    // const cached = await this.cache.get(key);
    console.log('getCache', key);
    //return cached;
  }

  async delCache(key: string): Promise<void> {
    // await this.cache.del(key);
  }

  async resetCache(): Promise<void> {
    // await this.cache.reset();
  }
}
