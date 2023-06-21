import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  getHello(): string {
    return 'Hello World!';
  }

  async setCache(): Promise<string> {
    await this.cacheManager.set('key', 'value');
    return 'Cache set';
  }

  async getCache(): Promise<string> {
    await this.cacheManager.set('key', 'value');
    return await this.cacheManager.get('key');
  }
}
