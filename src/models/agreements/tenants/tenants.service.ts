import { Injectable } from '@nestjs/common';
import { TenantDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class TenantsService {
  constructor(
    // @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async create(createTenantDto: TenantDto) {
    console.log({ createTenantDto });
    return `This action adds a new tenant`;
  }

  async findAll() {
    return `This action returns all tenants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }

  update(id: number, updateTenantDto: TenantDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
