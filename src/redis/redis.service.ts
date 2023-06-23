import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async setCache(key: string, value: any): Promise<void> {
    const done = this.cache.set(key, value, 1000);

    console.log({ done });
    return done;
  }

  async getCache(key: string) {
    console.log({ key });
    // const cached = await this.cache.get(key);
    // return cached;
  }

  async delCache(key: string): Promise<void> {
    await this.cache.del(key);
  }

  async resetCache(): Promise<void> {
    await this.cache.reset();
  }
}
