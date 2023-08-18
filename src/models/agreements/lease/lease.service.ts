import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRequestService } from 'src/services/userRequest.service';
import { CrudService } from 'src/services/crud.service';

import { createDto, updateDto } from './dto';
import { IQuery } from 'types/types';


@Injectable()
export class LeaseService {
  constructor(private prisma: PrismaService, private userRequest: UserRequestService, private CrudService: CrudService) { }

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

  async findAll(query: IQuery) {
    return this.CrudService.findMany('lease', query)
  }

  async findOne(id: number) {
    return this.CrudService.findOne('lease', id)

  }

  async update(id: number, updateData: updateDto) {
    return this.CrudService.update('lease', id, updateData as any)


  }

  async delete(id: number) {
    return this.CrudService.delete('lease', id)

  }
}
