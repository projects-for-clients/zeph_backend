import { UserRequestService } from 'src/services/userRequest.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { createDto, updateDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class LeasesService {
  constructor(private prisma: PrismaService, private userRequest: UserRequestService) { }

  async create(createLeaseDto: createDto) {
    const userId = this.userRequest.getUserId();

    const lease = await this.prisma.leases.create({
      data: {
        ...createLeaseDto,
        userId,
      },
    });

    if (!lease) throw new ForbiddenException('Unable to create lease');

    return lease;
  }

  async findAll() {

    const allLeases = await this.prisma.leases.findMany();
    return allLeases;
  }

  async findOne(id: number) {


    const lease = await this.prisma.leases.findUnique({
      where: {
        id,
      },
    });

    if (!lease) {
      throw new ForbiddenException('Lease not found');
    }


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


    await this.redis.set(`${LeasesService.name + id}`, lease);

    return lease;
  }

  async delete(id: number) {

    const lease = await this.prisma.leases.delete({
      where: {
        id,
      },
    }).catch(() => {

      throw new ForbiddenException("Lease not found")

    })

    await this.redis.del(`${LeasesService.name + id}`);

    return lease;
  }
}
