import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRequestService } from 'src/services/userRequest.service';
import { createDto, updateDto } from './dto';


@Injectable()
export class LeaseService {
  constructor(private prisma: PrismaService, private userRequest: UserRequestService) { }

  async create(createLeaseDto: createDto) {
    const userId = this.userRequest.getUserId();

    const lease = await this.prisma.lease.create({
      data: {
        ...createLeaseDto,
        userId,
      },
    });

    if (!lease) { throw new ForbiddenException('Unable to create lease'); }

    return lease;
  }

  async findAll() {

    const allLease = await this.prisma.lease.findMany();
    return allLease;
  }

  async findOne(id: number) {


    const lease = await this.prisma.lease.findUnique({
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
    const find = await this.prisma.lease.findUnique({
      where: {
        id,
      },
    });

    if (!find) {
      throw new ForbiddenException('Lease not found');
    }

    const lease = await this.prisma.lease.update({
      where: {
        id,
      },
      data: {
        ...find,
        ...updateLeaseDto,
      },
    });


    return lease;
  }

  async delete(id: number) {

    const lease = await this.prisma.lease.delete({
      where: {
        id,
      },
    }).catch(() => {

      throw new ForbiddenException("Lease not found")

    })

    return lease;
  }
}
