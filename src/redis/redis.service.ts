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

  async set(key: string, value: unknown, expiryTime?: number): Promise<string> {

    const res = await this.redis.set(key, JSON.stringify(value), 'EX', expiryTime);

    return res;
  }

  async append(key: string, value: unknown): Promise<null | string> {
    const cached = await this.redis.get(key);

    if (!cached) {
      return null;
    }

    const jsonRes = JSON.parse(cached);

    jsonRes.push(value);

    await this.redis.set(key, JSON.stringify(jsonRes));

    const res = await this.redis.get(key);

    return res;
  }

  async get(key: string) {
    const cached = await this.redis.get(key);
    const jsonRes = JSON.parse(cached);

    return jsonRes;
  }

  async update(key: string, value: unknown): Promise<string> {
    await this.redis.set(key, JSON.stringify(value));

    const get = await this.redis.get(key);

    return get;
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async flushAll(): Promise<void> {
    await this.redis.flushall();
  }

  async scan(key: string): Promise<string[]> {
    const results = await this.redis.scan(0, 'MATCH', key)
    return results[1]
  }

}
