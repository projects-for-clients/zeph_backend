import { Injectable } from '@nestjs/common';
import { LeasesDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class LeasesService {
  constructor(private redis: RedisService, private prisma: PrismaService) {}
  async create(createLeaseDto: LeasesDto) {
    const lease = await this.prisma.leases.create({
      data: createLeaseDto,
    });

    await this.redis.del(LeasesService.name);
    return lease;
  }

  async findAll() {
    const getAll = await this.redis.get(LeasesService.name);

    if (getAll) {
      return getAll;
    }

    const allLeases = await this.prisma.leases.findMany();

    await this.redis.set(LeasesService.name, allLeases);

    return allLeases;
  }

  findOne(id: number) {
    const checkCache = this.redis.get(`${LeasesService.name + id}`);

    if (checkCache) {
      return checkCache;
    }

    const lease = this.prisma.leases.findUnique({
      where: {
        id,
      },
    });

    this.redis.set(`${LeasesService.name + id}`, lease);

    return lease;
  }

  update(id: number, updateLeaseDto: LeasesDto) {
    const lease = this.prisma.leases.update({
      where: {
        id,
      },
      data: updateLeaseDto,
    });

    this.redis.set(`${LeasesService.name + id}`, lease);

    return lease;
  }

  remove(id: number) {
    return `This action removes a #${id} lease`;
  }
}
