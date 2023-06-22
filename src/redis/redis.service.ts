import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async setCache(key: string, value: any): Promise<void> {
    await this.cache.set(key, value, { ttl: 1000 });
  }

  async getCache(key: string): Promise<unknown> {
    const cached = await this.cache.get(key);
    return cached;
  }

  async delCache(key: string): Promise<void> {
    await this.cache.del(key);
  }

  async resetCache(): Promise<void> {
    await this.cache.reset();
  }
}
