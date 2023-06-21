import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  // constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getHello(): Promise<unknown> {
    // await this.cacheManager.set('key', { name: 'John' }, 1000);
    // const cached = await this.cacheManager.get('key');

    // return cached;
    return { name: 'John' };
  }

  // async setCache(): Promise<void> {
  //   await this.cacheManager.set('key', { name: 'John' }, 1000);
  // }

  // async getCache(): Promise<unknown> {
  //   const cached = await this.cacheManager.get('key');
  //   return cached;
  // }
}
