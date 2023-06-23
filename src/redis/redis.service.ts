import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async setCache(key: string, value: any): Promise<void> {
    console.log('setCache', key);
    return await this.cache.set(key, value, 7000);
  }

  async getCache(key: string) {
    const cached = await this.cache.get(key);
    console.log('getCache', key, cached);
    return cached;
  }

  async delCache(key: string): Promise<void> {
    await this.cache.del(key);
  }

  async resetCache(): Promise<void> {
    await this.cache.reset();
  }
}
