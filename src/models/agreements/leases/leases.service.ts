import { UserRequestService } from 'src/services/userRequest.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { createDto, updateDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class LeasesService {
  constructor(private redis: RedisService, private prisma: PrismaService) {}

  async create(createLeaseDto: createDto) {
    const userId = UserRequestService.getUserId();

    const lease = await this.prisma.leases.create({
      data: {
        ...createLeaseDto,
        userId,
      },
    });

    if (!lease) throw new ForbiddenException('Unable to create lease');

    await this.redis.set(`${LeasesService.name + lease.id}`, lease);

    await this.redis.append(LeasesService.name, lease);

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

  async findOne(id: number) {
    const checkCache = await this.redis.get(`${LeasesService.name + id}`);

    if (checkCache) {
      return checkCache;
    }

    const lease = await this.prisma.leases.findUnique({
      where: {
        id,
      },
    });

    if (!lease) {
      throw new ForbiddenException('Lease not found');
    }

    await this.redis.update(`${LeasesService.name + id}`, lease);

    return lease;
  }

  async update(id: number, updateLeaseDto: updateDto) {
    const find = await this.prisma.leases.findUnique({
      where: {
        id,
      },
    });

    if (!find) {
      throw new ForbiddenException('Lease not found');
    }

    const lease = await this.prisma.leases.update({
      where: {
        id,
      },
      data: {
        ...find,
        ...updateLeaseDto,
      },
    });

    console.log({ lease });

    await this.redis.set(`${LeasesService.name + id}`, lease);

    return lease;
  }

  async delete(id: number) {
    // await this.redis.flushAll();
    const lease = await this.prisma.leases.delete({
      where: {
        id,
      },
    });

    await this.redis.del(`${LeasesService.name + id}`);

    return lease;
  }
}
