import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return 'Hello World!';
  }

  // async setCache(): Promise<void> {
  //   await this.cacheManager.set('key', { name: 'John' }, 1000);
  // }

  // async getCache(): Promise<unknown> {
  //   const cached = await this.cacheManager.get('key');
  //   return cached;
  // }
}
