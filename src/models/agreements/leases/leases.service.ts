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

    

  }

  findOne(id: number) {
    return `This action returns a #${id} lease`;
  }

  update(id: number, updateLeaseDto: LeasesDto) {
    return `This action updates a #${id} lease`;
  }

  remove(id: number) {
    return `This action removes a #${id} lease`;
  }
}
