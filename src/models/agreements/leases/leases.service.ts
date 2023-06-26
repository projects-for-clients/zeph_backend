import { UserRequestService } from 'src/services/userRequest.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { createDto, updateDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class LeasesService {
  constructor(private redis: RedisService, private prisma: PrismaService) {}

  async create(createLeaseDto: createDto) {
    const count = 0;
    const userId = UserRequestService.getUserId();

    const lease = await this.prisma.leases.create({
      data: {
        ...createLeaseDto,
        userId,
      },
    });

    if (!lease) throw new ForbiddenException('Unable to create lease');

    const cached = await this.redis.set(`${LeasesService.name + lease.id}`, {
      ...createLeaseDto,
      userId,
    });

    await this.redis.append(LeasesService.name, cached);

    const getFromCache = await this.redis.get(
      `${LeasesService.name + lease.id}`,
    );

    console.log({ getFromCache });

    return getFromCache;
  }

  async findAll() {
    const getAll = await this.redis.get(LeasesService.name);

    // if (getAll) {
    //   return getAll;
    // }

    const allLeases = await this.prisma.leases.findMany();

    const cached = await this.redis.set(LeasesService.name, allLeases);

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

    const cache = await this.redis.set(`${LeasesService.name + id}`, lease);

    return cache;
  }

  async update(id: number, updateLeaseDto: updateDto) {
    const findCache = await this.redis.get(`${LeasesService.name + id}`);

    console.log({ findCache });

    const find = await this.prisma.leases.findUnique({
      where: {
        id,
      },
    });

    if (!find) {
      throw new ForbiddenException('Lease not found');
    }

    const lease = this.prisma.leases.update({
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
    await this.redis.flushAll();
    const lease = await this.prisma.leases.delete({
      where: {
        id,
      },
    });

    //await this.redis.del(`${LeasesService.name + id}`);

    return lease;
  }
}
