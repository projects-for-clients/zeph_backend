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

  async set(key: string, value: any): Promise<string> {
    console.log('set', key);

    const res = await this.redis.set(key, JSON.stringify(value));

    return res;
  }

  async append(key: string, value: any): Promise<any> {
    console.log('appendToCache', key);

    const cached = await this.redis.get(key);

    const jsonRes = JSON.parse(cached);

    jsonRes.push(value);

    await this.redis.set(key, JSON.stringify(jsonRes));

    const res = await this.redis.get(key);

    console.log({ res });
    return res;
  }

  async get(key: string) {
    const cached = await this.redis.get(key);
    console.log({ cached });
    //return cached;
    const jsonRes = JSON.parse(cached);

    console.log({ jsonRes });

    return jsonRes;
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async flushAll(): Promise<void> {
    await this.redis.flushall();
  }
}
